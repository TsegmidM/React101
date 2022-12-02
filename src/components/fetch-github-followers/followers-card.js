import { FaGithubSquare } from "react-icons/fa";
import { MdDetails } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
export default function FetchedGithubFollowers({
  fetchedCardData,
  chooseGithubName,
}) {
  const navigate = useNavigate();
  const { githubfollowersname } = useParams();
  const gitHubLink = `https://github.com/${fetchedCardData?.login}`;
  return (
    <div className="fgf-container">
      {/* <pre>{JSON.stringify(fetchedCardData, null, 2)}</pre> */}
      <div className="fgf-card">
        <div className="fgf-card-context">
          <a href={gitHubLink}><FaGithubSquare className="faGithubSquare"/>
          </a>
          <div>
            <img
              className="fgf-card-img"
              src={fetchedCardData?.avatar_url}
              alt="avatar img"
            />
          </div>
          <div className="fgf-name">{fetchedCardData?.name}</div>
          <div className="fgf-login">{fetchedCardData?.login}</div>
          <div>
            <b>{fetchedCardData?.bio}</b>
          </div>
          <div>
            {!githubfollowersname ? (
              <div className="fetched-card-bottom">
                <button
                  className="fetched-card-button"
                  onClick={() => {
                    navigate(fetchedCardData?.login);
                  }}
                >
                  View Profile
                </button>
                <button
                  className="fetched-card-button"
                  onClick={() => {
                    chooseGithubName(fetchedCardData?.login);
                  }}
                >
                  View Followers
                </button>
              </div>
            ) : (
              <div className="fgf-bottom-container">
                <div>
                  <span>{fetchedCardData?.followers}</span>
                  <span>Followers</span>
                </div>
                <div>
                  <span>{fetchedCardData?.following}</span>
                  <span>Following</span>
                </div>
                <div>
                  <span>{fetchedCardData?.public_repos}</span>
                  <span>Repositories</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
