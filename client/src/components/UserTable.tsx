import styled from "styled-components";
import { ControlButton } from "./DashboardBox";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "./Button";
import { MainTitle } from "../components/MyInfo";

const Container = styled.div`
  .controlBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .pagenationControlBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    .perPageBox {
    }

    .pagenationBox {
    }

    .pageText {
      padding: 0 1rem;
    }
  }

  @media screen and (max-width: 780px) {
    .title {
      margin-top: 102px;
    }
  }

  @media screen and (max-width: 1120px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 300px;
  height: 28px;
  border: 1px solid #ececec;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 5px;
  margin-right: 0.5rem;
`;

const TableContainer = styled.div`
  width: 1200px;
  // min-height: 500px;
  // height: 600px;
  height: 580px;
  overflow: scroll;
  background-color: #fff;
  border-radius: 10px;
`;

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  border-bottom: 1px solid #e5e5e5;
  font-size: 0.9rem;
  margin: auto;
  margin-bottom: 1rem;
  width: 1100px;
  word-wrap: break-word;
  // table-layout: fixed;
  // white-space: nowrap;

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
    text-align: center;
    min-width: 120px;
    border-top: 1px solid #e5e5e5;
  }

  th {
    padding: 10px 0;
  }

  td {
    padding: 8px 0;
  }
`;

export default function UserTable() {
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [option, setOption] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  let keys = ["name", "template", "domain", "siteName", "startDate"];
  if (option) {
    keys = keys.filter((key) => key === option);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/sites?q=${query}`);
      setData(res.data);
    };
    fetchUsers();
  }, [query]);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    await setQuery(text);
    setText("");
  };

  const handleReset = () => {
    setText("");
    setQuery("");
    setPage(0);
  };

  const handleDelete = (id: any) => {
    console.log("delete site : ", id);
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <MainTitle className="title">Site Management</MainTitle>

      <div className="controlBox">
        <div>
          <select
            name="Searchfilter"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="">모든 카테고리</option>
            <option value="siteName">사이트명</option>
            <option value="domain">도메인</option>
            <option value="template">템플릿</option>
            <option value="startDate">개설일</option>
            <option value="name">소유자</option>
          </select>
        </div>
        <div>
          <form onSubmit={handleSearch} className="searchForm">
            <label htmlFor="search-query">Search: </label>
            <SearchInput
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              name="search-query"
              placeholder="검색어를 입력하세요"
            />
            <Button type="submit">Search</Button>
            <Button onClick={() => handleReset()}>Reset</Button>
          </form>
        </div>
      </div>
      <TableContainer>
        <Table>
          <caption>검색된 사이트</caption>
          <thead>
            <tr>
              <th>목록</th>
              <th>사이트명</th>
              <th>도메인</th>
              <th>템플릿</th>
              <th>개설일</th>
              <th>소유자</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data
                .filter((item) => keys.some((key) => item[key].includes(query)))
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((e, idx) => (
                  <tr key={e.id}>
                    <td>{page * rowsPerPage + idx + 1}</td>
                    <td>{e.siteName}</td>
                    <td>{e.domain}</td>
                    <td>{e.template}</td>
                    <td>{e.startDate}</td>
                    <td>{e.name}</td>
                    <td>
                      <Link
                        to={"/user/" + e.userId}
                        style={{ textDecoration: "none" }}
                      >
                        <ControlButton
                          className={"editButton"}
                          rounding
                          color="white"
                        >
                          Manage
                        </ControlButton>
                      </Link>
                      <ControlButton
                        className={"deleteButton"}
                        onClick={() => handleDelete(e.id)}
                        color="gray"
                        rounding
                      >
                        Delete
                      </ControlButton>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td className="noSite" colSpan={7}>
                  사이트가 존재하지 않습니다.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
      <div className="pagenationControlBox">
        <div className="perPageBox">
          <span>Rows per page: </span>
          <select onChange={handleChangeRowsPerPage}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="pagenationBox">
          <Button
            outline
            rounding
            className="border rounded p-1"
            onClick={() => handlePrevPage()}
            disabled={page === 0 ? true : false}
          >
            {"<"}
          </Button>
          <span className="pageText">
            <strong>{page + 1}</strong> / {Math.ceil(data.length / rowsPerPage)}{" "}
            of {data.length}
          </span>
          <Button
            outline
            rounding
            className="border rounded p-1"
            onClick={() => handleNextPage()}
            disabled={
              page === Math.ceil(data.length / rowsPerPage) - 1 ? true : false
            }
          >
            {">"}
          </Button>
        </div>
      </div>
    </Container>
  );
}
