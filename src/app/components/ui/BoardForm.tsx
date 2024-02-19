"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ALGORITHMS_BASE,
  ALGORITHMS_SEAFARERS,
  NUM_OF_PLAYERS,
  PLAYERS_4,
} from "../../../lib/constants";
import { generateBoard } from "../../../actions/actions";

const BoardForm: React.FC = () => {
  const { register, watch } = useForm();
  const watchUseSeafarers = watch("useSeafarers");
  const [getAlgorithms, setAlgorithms] = useState(ALGORITHMS_BASE);

  useEffect(() => {
    if (watchUseSeafarers === true) {
      setAlgorithms(ALGORITHMS_SEAFARERS);
    } else {
      setAlgorithms(ALGORITHMS_BASE);
    }
  }, [watchUseSeafarers]);

  return (
    <form action={generateBoard} className="max-w-sm mx-auto">
      <div className="mb-5">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            {...register("useSeafarers")}
            type="checkbox"
            className="sr-only peer"
            data-testid="use-seafarers-checkbox"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Use Seafarers
          </span>
        </label>
      </div>

      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select a Board Generation Algorithm
        </label>
        <select
          {...register("randAlgorithm")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          data-testid="rand-algorithm-selector"
        >
          {getAlgorithms.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="mb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Number of Players
        </label>
        {NUM_OF_PLAYERS.map((item) => (
          <div key={item.id} className="flex items-center mb-4">
            <input
              {...register("numOfPlayers")}
              defaultChecked={item.id === PLAYERS_4}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              value={item.id}
              data-testid={`players-${item.id}-radio`}
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {item.label}
            </label>
          </div>
        ))}
      </fieldset>
      <button
        type="submit"
        className="px-6 py-3.5 text-base w-full font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        data-testid="submit-button"
      >
        Generate
      </button>
    </form>
  );
};

export default BoardForm;
