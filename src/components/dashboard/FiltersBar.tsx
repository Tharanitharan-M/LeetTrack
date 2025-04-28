'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface FiltersBarProps {
  filters: {
    difficulty: string;
    status: string;
    companies: string[];
    topics: string[];
  };
  setFilters: (filters: any) => void;
}

const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
const statuses = ['all', 'Solved', 'In Progress', 'Unsolved'];
const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'];
const topics = ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Dynamic Programming'];

export default function FiltersBar({ filters, setFilters }: FiltersBarProps) {
  const updateFilter = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Difficulty Filter */}
        <Listbox value={filters.difficulty} onChange={(value) => updateFilter('difficulty', value)}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left text-white focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500">
              <span className="block truncate">Difficulty: {filters.difficulty}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {difficulties.map((difficulty) => (
                  <Listbox.Option
                    key={difficulty}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-gray-300'
                      }`
                    }
                    value={difficulty}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {difficulty}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* Status Filter */}
        <Listbox value={filters.status} onChange={(value) => updateFilter('status', value)}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left text-white focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500">
              <span className="block truncate">Status: {filters.status}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {statuses.map((status) => (
                  <Listbox.Option
                    key={status}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-gray-300'
                      }`
                    }
                    value={status}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {status}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* Companies Filter */}
        <div className="flex flex-wrap gap-2">
          {companies.map((company) => (
            <button
              key={company}
              onClick={() => {
                const newCompanies = filters.companies.includes(company)
                  ? filters.companies.filter((c) => c !== company)
                  : [...filters.companies, company];
                updateFilter('companies', newCompanies);
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.companies.includes(company)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {company}
            </button>
          ))}
        </div>

        {/* Topics Filter */}
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => {
                const newTopics = filters.topics.includes(topic)
                  ? filters.topics.filter((t) => t !== topic)
                  : [...filters.topics, topic];
                updateFilter('topics', newTopics);
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.topics.includes(topic)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 