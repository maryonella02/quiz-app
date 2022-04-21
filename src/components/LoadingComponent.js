import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className="containter">
      <div className="loading-center">
        <ReactLoading type="bars" color="#000" />
      </div>
      <h1>Loading...</h1>
    </div>
  );
}

export default Loading;
