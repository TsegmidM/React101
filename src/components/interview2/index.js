import { useReducer } from "react";
import DogCardInfo from "./dog-card";

const initialValue = {
  ownerInfo: null,
  ownerDogs: [
    {
      id: 31,
      name: "Chika",
      ownerId: 4,
      ownerName: "Badi Owner",
      imageUrl: "https://bark-backend.azurewebsites.net/api/dog/image/517",
      dob: "2018-05-19T00:00:00",
      freeGroupId: null,
      isBanned: true,
      requireNeuteredSpayed: false,
      breed: "Affen Border Terrier",
      vaccinations: [
        { vaccinationId: 4, vaccinationName: "Distemper", status: "Verified" },
        { vaccinationId: 6, vaccinationName: "Influenza", status: "Verified" },
        {
          vaccinationId: 7,
          vaccinationName: "Leptospirosis",
          status: "Verified",
        },
      ],
      subscription: {
        id: 54,
        membershipName: "Annual Membership",
        status: "Active",
        statusDescription: "active",
        note: "stripe",
        paymentMethod: null,
        isExpired: false,
        expireDate: null,
      },
      status: "Red",
    },
    {
      id: 108,
      name: "Snoopy",
      ownerId: 4,
      ownerName: "Badi Owner",
      imageUrl: "https://bark-backend.azurewebsites.net/api/dog/image/460",
      dob: "2023-01-04T00:00:00",
      freeGroupId: 20,
      isBanned: false,
      requireNeuteredSpayed: true,
      breed: "Adronicus Mastiff",
      vaccinations: [
        { vaccinationId: 4, vaccinationName: "Distemper", status: "Verified" },
        { vaccinationId: 6, vaccinationName: "Influenza", status: "Missing" },
        {
          vaccinationId: 7,
          vaccinationName: "Leptospirosis",
          status: "Expired",
        },
      ],
      subscription: null,
      status: "Red",
    },
    {
      id: 118,
      name: "Banhar",
      ownerId: 4,
      ownerName: "Badi Owner",
      imageUrl: "https://bark-backend.azurewebsites.net/api/dog/image/555",
      dob: "2023-01-10T00:00:00",
      freeGroupId: null,
      isBanned: false,
      requireNeuteredSpayed: true,
      breed: "Adronicus Mastiff",
      vaccinations: [
        { vaccinationId: 4, vaccinationName: "Distemper", status: "Verified" },
        { vaccinationId: 6, vaccinationName: "Influenza", status: "Verified" },
        {
          vaccinationId: 7,
          vaccinationName: "Leptospirosis",
          status: "Verified",
        },
      ],
      subscription: {
        id: 65,
        membershipName: "Annual Membership",
        status: "Inactive",
        statusDescription: "active",
        note: "234",
        paymentMethod: null,
        isExpired: false,
        expireDate: null,
      },
      status: "Brown",
    },
  ],
};

const reduceDogsInfo = (currState, action) => {
  switch (action.type) {
    case "neut_spray":
      return {
        ...currState,
        ownerDogs: currState.ownerDogs.map((dog) => {
          if (dog.id === action.data.dogId)
            return {
              ...dog,
              requireNeuteredSpayed: !dog.requireNeuteredSpayed,
            };
          else return dog;
        }),
      };
    case "isBanned":
      return {
        ...currState,
        ownerDogs: currState.ownerDogs.map((dog) => {
          if (dog.id === action.data.dogId)
            return { ...dog, isBanned: !dog.isBanned };
          else return dog;
        }),
      };
    case "change_subscription":
      return {
        ...currState,
        ownerDogs: currState.ownerDogs.map((dog) => {
          if (dog.id === action.data.dogId)
            return {
              ...dog,
              subscription: dog.subscription
                ? null
                : initialValue.ownerDogs[0].subscription,
            };
          else return dog;
        }),
      };

    case "change_pass":
      return {
        ...currState,
        ownerDogs: currState.ownerDogs.map((dog) => {
          if (dog.id === action.data.dogId)
            return { ...dog, freeGroupId: dog.freeGroupId ? null : 20 };
          else return dog;
        }),
      };

    case "change_vaccine":
      return {
        ...currState,
        ownerDogs: currState.ownerDogs.map((dog) => {
          if (dog.id === action.data.dogId) {
            return {
              ...dog,
              vaccinations: dog.vaccinations.map((vac) => {
                if (vac.vaccinationId === action.data.vacId) {
                  return {
                    ...vac,
                    status: vac.status === "Verified" ? "Expired" : "Verified",
                  };
                } else return vac;
              }),
            };
          } else return dog;
        }),
      };

    default:
      return currState;
  }
};

const Interview2 = () => {
  const [dogsInfo, updateDogsInfo] = useReducer(reduceDogsInfo, initialValue);
  return (
    <div className="flex  ">
      {dogsInfo.ownerDogs.map((dogInfo, idx) => {
        return (
          <DogCardInfo
            key={idx}
            dogInfo={dogInfo}
            updateDogsInfo={updateDogsInfo}
          />
        );
      })}
    </div>
  );
};
export default Interview2;
