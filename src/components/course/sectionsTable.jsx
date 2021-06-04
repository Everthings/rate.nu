import { useMemo } from "react";
import { useTable } from "react-table";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { averageData } from "../../utils/dataUtils";

const Box = styled.div`
  padding: 1rem;
  box-shadow: rgb(236 237 237 / 40%) 0px 2px 5px,
    rgb(142 147 148 / 20%) 0px 0px 5px;
  font-family: "Calibri", sans-serif;
  overflow: auto;
  width: fit-content;
  max-width: 100%;
`;

const Table = styled.div`
  table {
    border-spacing: 0;
    text-align: right;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    tbody {
      tr {
        :hover {
          background-color: #e5e5e5;
          cursor: pointer;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const SectionsTable = ({ evals, sections }) => {
  const history = useHistory();
  const location = useLocation();

  const evalsBySection = {};
  sections.forEach(({ _id }) => {
    evalsBySection[_id] = evals.filter(({ section_id }) => section_id === _id);
  });

  const averagesBySection = [];
  for (let [section_id, evals] of Object.entries(evalsBySection)) {
    averagesBySection.push({
      ...averageData(evals, [
        "course_rating",
        "instructor_rating",
        "difficulty_rating",
        "extra_hours",
      ]),
      ...sections.find(({ _id }) => section_id === _id),
    });
  }

  const handleClick = ({ _id }) => {
    history.push(`${location.pathname}/${_id}`);
  };

  const valToText = (val) => (isNaN(val) ? "-" : val);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: useMemo(
        () => [
          {
            Header: "Section #",
            accessor: ({ component, section }) => `${component} ${section}`,
          },
          {
            Header: "Instructor(s)",
            accessor: ({ instructors }) =>
              instructors.length > 0 ? instructors.join(", ") : "-",
            id: "instructors",
          },
          {
            Header: "Course Rating",
            accessor: ({ course_rating }) => valToText(course_rating),
          },
          {
            Header: "Instructor Rating",
            accessor: ({ instructor_rating }) => valToText(instructor_rating),
          },
          {
            Header: "Difficulty Rating",
            accessor: ({ difficulty_rating }) => valToText(difficulty_rating),
          },
          {
            Header: "Hours Outside of Class",
            accessor: ({ extra_hours }) => valToText(extra_hours),
          },
        ],
        []
      ),
      data: averagesBySection,
    });

  return (
    <Box>
      <Table>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => handleClick(row.original)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Table>
    </Box>
  );
};

export default SectionsTable;
