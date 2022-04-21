import { Card, CardTitle } from "reactstrap";
function Error() {
  return (
    <Card
      body
      className="text-center"
    >
      <CardTitle tag="h5">
        Error retrieving data! Try reloading page or check connection to the
        internet!
      </CardTitle>
    </Card>
  );
}

export default Error;
