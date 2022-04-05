export default function Song(props) {
  return (
    <div>
      <h2 className="font-bold text-2xl content-center text-gray-800">
        {props.title}
      </h2>
      <p>{props.album}</p>
      {props.matches.map((match) => (
        <p>{match}</p>
      ))}
    </div>
  );
}
