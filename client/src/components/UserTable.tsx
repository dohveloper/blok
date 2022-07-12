import styled from "styled-components";
import { ControlButton } from "./DashboardBox";
import React, { useState, useEffect } from "react";

const Container = styled.div`
  //   width: 1200px;
  min-height: 500px;
  background-color: #fff;
`;

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  border-bottom: 1px solid #e5e5e5;
  font-size: 0.9rem;
  margin: auto;

  caption {
    color: black;
    font-size: 1rem;
    font-weight: bold;
    padding: 1rem;
    text-align: left;
  }

  &,
  th,
  td {
    border-top: 1px solid #e5e5e5;
  }

  th,
  td {
    text-align: center;
    padding: 12px;
    min-width: 120px;
  }

  th {
    padding: 10px;
    border-: 1px solid #e5e5e5;
  }
`;

const data = [
  {
    template: "이력서",
    domain: "www.naver.com",
    plan: "free",
    startDate: "20220202",
    name: "앨리스",
  },
  {
    template: "이력서",
    domain: "www.naver.com",
    plan: "free",
    startDate: "20220202",
    name: "윤영주",
  },
  {
    template: "이력서",
    domain: "www.naver.com",
    plan: "free",
    startDate: "20220202",
    name: "앨리샤",
  },
];

export default function UserTable() {
  const [query, setQuery] = useState("");

  const handleReset = () => setQuery("");
  const handleChange = (e: any) => setQuery(e.target.value);
  console.log(query);

  return (
    <Container>
      <div>
        <select name="filter">
          <option value="template">템플릿</option>
          <option value="domain">도메인</option>
          <option value="plan">플랜</option>
          <option value="startDate">개설일</option>
          <option value="owner">소유자</option>
        </select>
        <label htmlFor="search-query">Search</label>
        <input
          value={query}
          onChange={handleChange}
          type="text"
          name="search-query"
        />
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <Table>
        <caption>검색된 사이트</caption>
        <thead>
          <tr>
            <th>
              <input type="checkbox"></input>
            </th>
            <th>템플릿</th>
            <th>도메인</th>
            <th>플랜</th>
            <th>개설일</th>
            <th>소유자</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr key={e.domain}>
              <td key={e.template}></td>
              <td>{e.template}</td>
              <td>{e.domain}</td>
              <td>{e.plan}</td>
              <td>{e.startDate}</td>
              <td>{e.name}</td>
              <td>
                <ControlButton className={"editButton"} rounding outline>
                  Edit
                </ControlButton>
                <ControlButton className={"deleteButton"} color="gray" rounding>
                  Delete
                </ControlButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
