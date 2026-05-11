function Topper({ topper }) {
  return (
    <div className="card topper topper-card">
      <h2>🏆 Top Performer</h2>

      {topper ? (
        <>
          <h3>{topper.name}</h3>

          <p>Marks: {topper.marks}</p>

          <p>Skills: {topper.skills}</p>
        </>
      ) : (
        <p>No students added</p>
      )}
    </div>
  );
}

export default Topper;