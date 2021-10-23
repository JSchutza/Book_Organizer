

// important
// used within a modal. need the dispatch and selector in the outer component
// that renders this one so that you can just pass the selected object into the
// payload prop


const Followers = ({ payload }) => {




  const UserInfo = () => {
    return (
      <>
        {/* avatar */}
        <div></div>
        {/* text information */}
        <div></div>
      </>
    );
  };



  const TheirBooks = () => {
    return (
      <>
        {/* books */}
        <div></div>
      </>
    );
  };



  const TheirCharacters = () => {
    return (
      <>
        {/* characters */}
        <div></div>
      </>
    );
  };



  const TheirPolls = () => {
    return (
      <>
        {/* polls */}
        <div></div>
      </>
    );
  };



  const TheirFollowers = () => {
    return (
      <>
        {/* followers */}
        <div></div>
      </>
    );
  };



  const TheirFollowing = () => {
    return (
      <>
        {/* following */}
        <div></div>
      </>
    );
  };



  return (
    <>
    {Object.values(payload).map(eachFollower => (
      <>
      </>
    ))}
    </>
  )
};

export default Followers;
