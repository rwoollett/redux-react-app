import React from 'react';
import Table, { ConfigTable } from "./Table";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import useSort from "../hooks/use-sort";
import style from './SortableTable.module.scss';

function SortableTable<T>(props: {
  data: T[];
  config: ConfigTable<T>,
  keyFn: (item:T) => string|number;
}) {
  const { config, data } = props;
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(data, config.columns);

  const updateConfig = config.columns.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th
          className={style.sortableHeader}
          onClick={() => setSortColumn(column.label)}
        >
          <div className={style.control}>
            {column.label}
            {getIcon(column.label, sortBy, sortOrder)}
          </div>
        </th>
      ),
    };
  });

  config.columns = updateConfig;
  return <Table {...props} data={sortedData} config={config} />;

}

function getIcon(label: string, sortBy: string | null, sortOrder: string | null) {
  if (label !== sortBy) {
    return (
      <div className={style.arrowContainer}>
        <GoArrowUp /> <GoArrowDown />
      </div>
    );
  }

  if (sortOrder === null) {
    return (
      <div className={style.arrowContainer}>
        <GoArrowUp /> <GoArrowDown />
      </div>
    );
  } else if (sortOrder === 'asc') {
    return (
      <div className={style.arrowContainer}>
        <GoArrowUp />
      </div>
    );
  } else if (sortOrder === 'desc') {
    return (
      <div className={style.arrowContainer}>
        <GoArrowDown />
      </div>
    );
  }
}

export default SortableTable;