"use client";

import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

const expansionsItems = [
  {
    id: "seafarers",
    label: "Seafarers",
  },
  {
    id: "citiesAndKnights",
    label: "Cities and Knights",
  },
] as const;

const algorithms = [
  {
    id: "coastal",
    label: "Coastal",
  },
  {
    id: "thinLandMass",
    label: "Thin Land Mass",
  },
  {
    id: "largeLandMass",
    label: "Large Land Mass",
  },
  {
    id: "largeIslands",
    label: "Large Islands",
  },
  {
    id: "smallIslands",
    label: "Small Islands",
  },
] as const;

const numOfPlayers = [
  {
    id: "4",
    label: "4 Players",
  },
  {
    id: "6",
    label: "6 Players",
  },
] as const;

const BoardForm: React.FC = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
      <fieldset>
        <label
          htmlFor="expansions"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Expansions
        </label>
        {expansionsItems.map((item) => (
          <div key={item.id} className="flex items-center mb-4">
            <input
              {...register("expansions")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="checkbox"
              value={item.id}
            />
            <label
              htmlFor="expansions"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {item.label}
            </label>
          </div>
        ))}
      </fieldset>

      <div className="mb-5">
        <label
          htmlFor="randAlgorithm"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          {...register("randAlgorithm")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {algorithms.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="mb-5">
        <label
          htmlFor="numOfPlayers"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Number of Players
        </label>
        {numOfPlayers.map((item) => (
          <div key={item.id} className="flex items-center mb-4">
            <input
              {...register("numOfPlayers")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              value={item.id}
            />
            <label
              htmlFor="numOfPlayers"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {item.label}
            </label>
          </div>
        ))}
      </fieldset>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default BoardForm;
