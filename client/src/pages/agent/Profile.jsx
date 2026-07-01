import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Profile = () => {
  return (
    <Card className="max-w-2xl">

      <h1 className="mb-6 text-3xl font-bold tracking-tight text-black">
        Agent Profile
      </h1>

      <Input
        label="Name"
        value="Rahul Sharma"
        onChange={() => {}}
      />

      <Input
        label="Phone"
        value="9876543210"
        onChange={() => {}}
      />

      <Input
        label="Assigned Zone"
        value="Kanpur"
        onChange={() => {}}
      />

      <Button className="mt-6">
        Update Profile
      </Button>

    </Card>
  );
};

export default Profile;