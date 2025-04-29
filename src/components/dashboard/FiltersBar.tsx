'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { problems } from '@/problems';

interface FiltersBarProps {
  filters: {
    difficulty: string;
    status: string;
    companies: string[];
    topics: string[];
  };
  setFilters: (filters: FiltersBarProps['filters']) => void;
  useDropdowns?: boolean;
}

const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
const statuses = ['all', 'Solved', 'In Progress', 'Unsolved'];
const companies = Array.from(new Set(problems.flatMap(p => p.companies))).sort((a, b) => a.localeCompare(b));
const topics = Array.from(new Set(problems.map(p => p.topic))).sort((a, b) => a.localeCompare(b));

export default function FiltersBar({ filters, setFilters, useDropdowns }: FiltersBarProps) {
  const updateFilter = (key: keyof FiltersBarProps['filters'], value: string | string[]) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Difficulty Filter */}
        <Listbox value={filters.difficulty} onChange={(value) => updateFilter('difficulty', value)}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left text-white focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500">
              <span className="block truncate">Difficulty: {filters.difficulty}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                            <Check className="h-5 w-5" aria-hidden="true" />
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
                <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                            <Check className="h-5 w-5" aria-hidden="true" />
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
        {useDropdowns ? (
          <Listbox value={filters.companies} onChange={(value) => updateFilter('companies', value)} multiple>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left text-white focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500">
                <span className="block truncate">{filters.companies.length > 0 ? filters.companies.join(', ') : 'Companies'}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {companies.map((company) => (
                    <Listbox.Option
                      key={company}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-600 text-white' : 'text-gray-300'
                        }`
                      }
                      value={company}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{company}</span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                              <Check className="h-5 w-5" aria-hidden="true" />
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
        ) : (
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
        )}

        {/* Topics Filter */}
        <Listbox value={filters.topics[0] || 'all'} onChange={(value) => updateFilter('topics', value === 'all' ? [] : [value])}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left text-white focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500">
              <span className="block truncate">Topic: {filters.topics[0] || 'all'}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <Listbox.Option
                  key="all"
                  value="all"
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-600 text-white' : 'text-gray-300'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>All</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
                {topics.map((topic) => (
                  <Listbox.Option
                    key={topic}
                    value={topic}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-gray-300'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{topic}</span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                            <Check className="h-5 w-5" aria-hidden="true" />
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
      </div>
    </div>
  );
} 