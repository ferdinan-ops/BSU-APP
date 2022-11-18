import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Dropdown({ title, listData, selected, setSelected }) {
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? listData
      : listData.filter((data) =>
        data
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  return (
    <div className="flex flex-col font-sans">
      <p className="mb-2 text-sm font-semibold text-font">{title}</p>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative flex h-[50px] w-full cursor-default items-center justify-center overflow-hidden rounded-lg border border-auth text-base">
            <Combobox.Input
              className="w-full py-2 pl-3 pr-10 text-base font-medium leading-5 text-font outline-none"
              displayValue={(data) => data}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="text-gray-400 h-5 w-5" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
              {filteredData.length === 0 && query !== "" ? (
                <div className="text-gray-700 relative cursor-default select-none py-2 px-4">
                  Tidak dapat menemukan apapun 😢.
                </div>
              ) : (
                filteredData.map((data, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-primary text-white" : "text-gray-900"
                      }`
                    }
                    value={data}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{data}</span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-primary"}`}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
