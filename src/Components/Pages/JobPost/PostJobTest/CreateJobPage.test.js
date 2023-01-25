import React from "react";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "@testing-library/react";
import { Textfeild } from "../components/Textfeild";
import { MultiSelectDropDown } from "../components/MultiSelectDropDown";
import { SimpleDropDown } from "../components/SimpleDropDown";
import { CreateJobPage } from "../PostJob/CreateJobPage";
import mockdata from "./mockdata";

describe("Testing the Posting of Job as a Hiring Manager", () => {
  // input feilds
  it("Input feild test:  Input text feild should be rendered", () => {
    render(
      <Textfeild
        inputValue="this is a job"
        placeholderText="enter job description"
      ></Textfeild>
    );
    expect(
      screen.getByPlaceholderText("enter job description")
    ).toBeInTheDocument();
  });

  // multiselect dropdown
  it("Multiselect DropdownField test: Multiselect dropdown should display on screen", () => {
    render(
      <MultiSelectDropDown
        fetchedOptions={[
          "Contribute in all phases of the development lifecycle",
          "Write well designed, testable, efficient code",
          "Ensure designs are in compliance with specifications",
        ]}
      ></MultiSelectDropDown>
    );
    expect(screen.getByPlaceholderText("Select")).toBeInTheDocument();
  });

  it("Multiselect DropdownField test: multiselect options should be rendered", () => {
    render(
      <MultiSelectDropDown
        fetchedOptions={[
          "Contribute in all phases of the development lifecycle",
          "Write well designed, testable, efficient code",
          "Ensure designs are in compliance with specifications",
        ]}
      ></MultiSelectDropDown>
    );
    // const select = screen.getByPlaceholderText("Select");
    screen.getByText("Write well designed, testable, efficient code")
    expect(
      screen.getByText("Write well designed, testable, efficient code")
    ).toBeInTheDocument();
    //expect(select).toContainElement(screen.getByText("Write well designed, testable, efficient code"));
  });

  // simple dropdown
  it("SingleSelect DropdownField test: Simple dropdown options should be rendered", () => {
    render(<SimpleDropDown
      title = "test-simpleDropDown"
      selectedOption = "karachi"
      setSelectedOption = {(e)=>{return null}}
      options={["karachi", "lahore", "islamabad"]} />);
    //const select = screen.getByText('karachi');
    expect(screen.getByText("lahore")).toBeInTheDocument();
  });

  describe("mocking the fetch and perform test", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockdata),
      });
    });
    it("should send post request", () => {
      // render(<CreateJobPage />);
      // const saveButton = screen.getByText("SUBMIT");
      // fireEvent.click(saveButton);
      // expect(saveButton).toBeInTheDocument();
      // expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
