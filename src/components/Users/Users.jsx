import styles from "./users.module.css";
const Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        followed: true,
        photoUrl:
          "https://yt3.googleusercontent.com/6u9UIicyOGCpoCY4GcYKpi4IBJ4DwGvUdDp7jxqZdupC3WQnEettlEIbZJsk4yAQ9EZMPU66IzY=s900-c-k-c0x00ffffff-no-rj",
        fullName: "Oleg",
        status: "I am a boss",
        location: { city: "Moskov", country: "Russia" },
      },
      {
        id: 2,
        followed: false,
        fullName: "Olga",
        status: "a boss",
        location: { city: "Minsk", country: "Belarus" },
      },
      {
        id: 3,
        followed: false,
        fullName: "Pavel",
        status: "boss",
        location: { city: "XZ", country: "Uzbekistan" },
      },
      {
        id: 4,
        followed: false,
        fullName: "Anton",
        status: "I ",
        location: { city: "London", country: "British" },
      },
      {
        id: 5,
        followed: false,
        fullName: "Sveta",
        status: "I am a",
        location: { city: "NewYork", country: "USA" },
      },
    ]);
  }

  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <img src={u.photoUrl} className={styles.userPhoto} />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.country}</div>
              <div>{u.location.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
