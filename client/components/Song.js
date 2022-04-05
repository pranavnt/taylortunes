import ReactHTMLParser from "react-html-parser";

export default function Song(props) {
  return (
    <div>
      <h2 className="font-bold text-xl content-center text-gray-800">
        {props.title}
      </h2>
      <p className="">{props.album}</p>
      {props.matches.map((match, index) => (
        <>
          <span className="border-gray-200 border-b-[1px]" key={index}>
            {ReactHTMLParser("<b>" + (index + 1) + "</b>" + " | " + match)}
          </span>
          <br />
        </>
      ))}
      <hr />
    </div>
  );
}
