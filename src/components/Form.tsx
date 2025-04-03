import { Button } from "@carbon/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setFormData } from "@/app/redux/actions/formActions";
import { useRouter } from "next/navigation";
import Input from "./shared/input";
import DropdownComponent from "./shared/dropdown";

const Form = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { input1, input2, dropdown1, dropdown2, submitted } = useSelector(
    (state: RootState) => state.form
  );

  const options = [
    { text: "Table 1", value: "Table 1" },
    { text: "Table 2", value: "Table 2" },
    { text: "Table 3", value: "Table 3" },
    { text: "Table 4", value: "Table 4" },
    { text: "Table 5", value: "Table 5" },
    { text: "Table 6", value: "Table 6" },
    { text: "Table 7", value: "Table 7" },
    { text: "Table 8", value: "Table 8" },
  ];

  const handleInputChange = (name: string, value: string) => {
    dispatch(
      setFormData({
        input1: name === "input1" ? value : input1,
        input2: name === "input2" ? value : input2,
        dropdown1,
        dropdown2,
        submitted,
      })
    );
  };

  const handleDropdownChange = (name: string, value: string) => {
    dispatch(
      setFormData({
        input1,
        input2,
        dropdown1: name === "dropdown1" ? value : dropdown1,
        dropdown2: name === "dropdown2" ? value : dropdown2,
        submitted,
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      setFormData({
        input1,
        input2,
        dropdown1,
        dropdown2,
        submitted: true,
      })
    );

    router.push("/dashboard");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Redux Form Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            placeholder="Enter something..."
            labelText="Input 1"
            value={input1}
            onInputChange={(e) => handleInputChange("input1", e.target.value)}
            disabled={submitted}
          />
          <Input
            placeholder="Enter something..."
            labelText="Input 2"
            value={input2}
            onInputChange={(e) => handleInputChange("input2", e.target.value)}
            disabled={submitted}
          />

          <DropdownComponent
            labelText="Select Options"
            titleText="Select Options"
            items={options}
            selectedItem={dropdown1}
            onChange={(value) => handleDropdownChange("dropdown1", value)}
            disabled={submitted}
          />
          <DropdownComponent
            labelText="Select Options"
            titleText="Select Options"
            items={options}
            selectedItem={dropdown2}
            onChange={(value) => handleDropdownChange("dropdown2", value)}
            disabled={submitted}
          />
        </div>

        <Button type="submit" disabled={submitted}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
