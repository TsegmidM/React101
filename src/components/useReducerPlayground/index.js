import { Button } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useReducer } from "react";

const reduceUsersInfo = (currState, action) => {
  switch (action.type) {
    case "initialData":
      return action.data;
    case "edit":
      return currState.map((info) => {
        if (info.id === action.data.id) {
          return {
            ...info,
            employment: { ...info.employment, title: action.data.newTitle },
          };
        } else return info;
      });
    case "change_subs":
      return currState.map((user) => {
        if (
          user.firstName === action.data.userInfo.firstName &&
          user.lastName === action.data.userInfo.lastName
        ) {
          return {
            ...user,
            subscription: {
              ...user.subscription,
              plan: action.data.newSubscriptionPlan,
            },
          };
        } else {
          return user;
        }
      });
    case "new_property_citiesLivedIn":
      return currState.map((user) => {
        return {
          ...user,
          address: {
            ...user.address,
            citiesLivedIn: [user.address.city],
          },
        };
      });
    case "sort_by_firstName":
      return currState
        .sort((a, b) => {
          if (a.first_name > b.first_name) return 1;
          else return -1;
        })
        .map((user) => user);
    case "filter_genders":
      return currState
        .map((user) => {
          return user.gender;
        })
        .reduce((acc, curr) => {
          if (!acc.includes(curr)) return [...acc, curr];
          else return acc;
        }, []);
    case "add_age_property":
      return currState.map((user) => {
        return {
          ...user,
          age: action.data.currentYear - user.date_of_birth.slice(0, 4),
        };
      });
    case "student_plan":
      return currState.filter(
        (user) => user.subscription.plan === action.data.plan_type
      );
    case "find_firstName_vowel":
      const vowels = "aeiou";
      return currState.filter((user) =>
        vowels.includes(user.first_name[0].toLowerCase())
      );
    case "born_before_1970":
      return currState.filter(
        (user) => user.date_of_birth.slice(0, 4) < action.data.year
      );
    case "title_with_two_words":
      return currState.filter(
        (user) => user.employment.title.split(" ").length === 2
      );
    case "first_name_less_than_5":
      return currState.filter((user) => user.first_name.length < 5);
    default:
      break;
  }
};
const UseReducerPlay = () => {
  // declare an useReducer state
  const [usersInfo, updateUsersInfo] = useReducer(reduceUsersInfo, []);
  const fetchData = () => {
    axios.get("https://random-data-api.com/api/v2/users?size=5").then((res) => {
      if (res.status === 200) {
        updateUsersInfo({ type: "initialData", data: res.data });
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  // https://random-data-api.com/api/v2/users?size=5
  // fetch the api above and save it in useReducer with
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          fetchData();
        }}
      >
        RESET DATA
      </Button>
      {/* Add a button that changes the employement info of user with id with {3rd person's id} */}
      <Button
        onClick={() => {
          updateUsersInfo({
            type: "edit",
            data: { id: usersInfo[0].id, newTitle: "Bee" },
          });
        }}
      >
        Change info
      </Button>
      {/* Add a button that changes the subscription plan of user whose firstName and lastName are the names of the 4th person */}
      <Button
        onClick={() => {
          updateUsersInfo({
            type: "change_subs",
            data: {
              userInfo: {
                firstName: usersInfo[0]?.firstName,
                lastName: usersInfo[0]?.lastName,
              },
              newSubscriptionPlan: "Silver Plan",
            },
          });
        }}
      >
        Change subscription
      </Button>
      {/* Add a button that adds a citiesLivedIn property, and add the current address's city as the first city  */}
      <Button
        onClick={() => {
          updateUsersInfo({
            type: "new_property_citiesLivedIn",
            data: {},
          });
        }}
      >
        Add citiesLivedIn
      </Button>
      {/* Add a button that sorts the users by their first name in ascending order A-Z  */}
      <Button
        onClick={() => {
          updateUsersInfo({ type: "sort_by_firstName", data: {} });
        }}
      >
        Sort by First Name A-Z
      </Button>
      {/* Add a button that finds/filters all the genders. Make sure to remove the duplicates. New array should only contain the genders, not whole date of user. Ex: ['Genderfluid', 'Polygender'] */}
      <Button
        onClick={() => {
          updateUsersInfo({ type: "filter_genders", data: {} });
        }}
      >
        Filter all the genders
      </Button>
      {/* -------------------- */}
      {/* Add a button that adds a new property called age, and its value should be the difference between year of date_of_birth and 2023 */}
      <Button
        onClick={() => {
          updateUsersInfo({
            type: "add_age_property",
            data: { currentYear: 2023 },
          });
        }}
      >
        Add Age
      </Button>
      {/* Add a button that finds all the users who have "Student" subscription plan. */}
      <Button
        onClick={() => {
          updateUsersInfo({
            type: "student_plan",
            data: { plan_type: "Student" },
          });
        }}
      >
        Student Plan
      </Button>
      {/* -------------------- */}
      {/* Add a button that finds all the users whose firstName starts with vowel. */}
      <Button
        onClick={() => {
          updateUsersInfo({ type: "find_firstName_vowel", data: {} });
        }}
      >
        Find users Vowel
      </Button>

      {/* Add a button that finds all the users who were born before 1970. */}
      <Button
        onClick={() => {
          updateUsersInfo({ type: "born_before_1970", data: { year: 1970 } });
        }}
      >
        Born Before 1970
      </Button>
      {/* Add a button that finds all the users whose employment title consists of 2 words. */}
      <Button
        onClick={() => {
          updateUsersInfo({ type: "title_with_two_words", data: {} });
        }}
      >
        Title with 2 words
      </Button>
      {/* Add a button that finds all the users whose first name length is less than 5 */}
      <Button
        onClick={() => {
          updateUsersInfo({ type: "first_name_less_than_5", data: {} });
        }}
      >
        {"firstName.length < 5"}{" "}
      </Button>

      {usersInfo.map((info, idx) => {
        return <pre key={idx}>{JSON.stringify(info, null, 2)}</pre>;
      })}
    </div>
  );
};
export default UseReducerPlay;
