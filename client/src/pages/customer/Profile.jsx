import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Profile = () => {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Update your account information.
        </p>

      </div>

      <Card>

        <div className="grid md:grid-cols-2 gap-6">

          <Input
            label="Full Name"
            value="Anurag Pandey"
            onChange={() => {}}
          />

          <Input
            label="Email"
            value="anurag@gmail.com"
            onChange={() => {}}
          />

          <Input
            label="Phone"
            value="9876543210"
            onChange={() => {}}
          />

          <Input
            label="Address"
            value="Kanpur"
            onChange={() => {}}
          />

        </div>

        <Button className="mt-6">
          Save Changes
        </Button>

      </Card>

    </div>
  );
};

export default Profile;