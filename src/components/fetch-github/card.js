import "./index.css";
export default function FetchedGithubCard({ fetchedCardData }) {
  return (
    // <div className="fetchedCard-container">
    //     <pre>{JSON.stringify(fetchedCardData, null, 2)}</pre>

    // </div>

    <div className="fetchedCard-container">
      <pre>{JSON.stringify(fetchedCardData, null, 2)}</pre>
      <div className="fetched-card">
      <div className="fetchedCard-context">
        <div>
          <img
            className="fetchedCard-img"
            src={fetchedCardData?.avatar_url}
            alt="avatar img"
          />
        </div>
        <div className="fetchedCard-name">{fetchedCardData?.name}</div>
        <div className="fetchedCard-login">{fetchedCardData?.login}</div>
        <div>
          <b>{fetchedCardData?.bio}</b>
        </div>
        <div>{`followers: ${fetchedCardData?.followers}`} </div>
        <div>{`following: ${fetchedCardData?.following}`} </div>
        <div>{`Repositories: ${fetchedCardData?.public_repos}`} </div>
      </div>
      </div>
    </div>
  );
}
