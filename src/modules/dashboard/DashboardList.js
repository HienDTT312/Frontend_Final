import React, { useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import DashBoardCard from "../../component/dashboardCard/DashBoardCard";
import { FaRegUser } from "react-icons/fa";
import {
  AiOutlineClockCircle,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineRise,
  AiOutlineUser,
  AiFillHome,
  AiOutlineLineChart,
} from "react-icons/ai";
import { FaRegLightbulb } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Pie,
  Sector,
  PieChart,
} from "recharts";

import styles from "./DashboardList.module.css";
import dashboardImg1 from "../../assets/dashboard/dashboard1.jpg";
import dashboardImg2 from "../../assets/dashboard/dashboard2.jpg";
import dashboardImg3 from "../../assets/dashboard/dashboard3.jpg";
import dashboardImg4 from "../../assets/dashboard/dashboard4.jpg";
import recentUser from "../../assets/user/avatar/AnThieuNang.jpg";
import axiosClient from "../../apis/axios.config";
import PopularTableHead from "./table-head";
import Table from "../../component/table/Table";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import checkRole from "../../helpers/checkRole";

const dataBar = [
  {
    name: "JAN",
    Marketing: 2000,
    Business: 2400,
    IT: 1200,
  },
  {
    name: "FEB",
    Marketing: 200,
    Business: 1200,
    IT: 400,
  },
  {
    name: "MAR",
    Marketing: 300,
    Business: 3000,
    IT: 2700,
  },
];

const dataPipe = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function DashboardList() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentRole = checkRole(currentUser.role_id);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataDashboard, setDataDashboard] = useState([]);
  const [reaction, setReaction] = useState(false);
  const [products, setProducts] = useState([]);

  const [todo, setTodo] = useState([
    {
      name: "Print Statements",
      status: false,
    },
    {
      name: "Prepare for presentation",
      status: true,
    },
  ]);
  const [task, setTask] = useState("");

  useEffect(() => {
    async function getPopularProduct() {
      const res = await axiosClient.get(`http://localhost:3001/project/view`);
      setProducts(res.data.data);
    }

    getPopularProduct();
  }, []);

  useEffect(() => {
    async function getDashboardCard(type) {
      const res = await axiosClient.get(
        `http://localhost:3001/project/${type}`
      );
      return setDataDashboard(res.data.data);
    }
    if (currentRole === "Admin" || currentRole === "QA Manager") {
      getDashboardCard("dashboard-admin");
    } else {
      getDashboardCard("dashboard");
    }
  }, [currentRole]);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const renderRows = (item, index) => (
    <tr className={styles.popularRow} key={`${item.product_id} - ${index}`}>
      <td>{index + 1}</td>
      <td>{item.product.user.full_name}</td>
      <td>{item.product.description}</td>
      <td>{item.Counted}</td>
    </tr>
  );

  const handleOnChange = (target) => {
    setTask(target.value);
  };

  const handleOnChangeCheck = (index) => {
    const newTodo = [...todo];
    newTodo[index] = { ...newTodo[index], status: !newTodo[index].status };
    setTodo(newTodo);
  };

  const handleDeleteTask = (indexDelete) => {
    setTodo(
      todo.filter((item, index) => {
        return index !== indexDelete;
      })
    );
  };

  const handleSubmitTodo = (e) => {
    e.preventDefault();
    setTask("");
    setTodo([...todo, { name: task, status: false }]);
  };

  return (
    <section className={styles.container}>
      <div className={styles.pageHeader}>
        <span>
          <AiFillHome />
        </span>
        <h2>Dashboard</h2>
      </div>
      {/* Dashboard Card */}
      <div className={styles.header}>
        <div className="row">
          <div className={clsx(styles.itemContainer, "col sm12 md4 lg4")}>
            <div className={styles.dashboardItem}>
              <DashBoardCard
                title={`Users`}
                data={dataDashboard.user}
                icon={<AiOutlineUser />}
              />
            </div>
          </div>
          <div className={clsx(styles.itemContainer, "col sm12 md4 lg4")}>
            <div className={styles.dashboardItem}>
              <DashBoardCard
                title="Products"
                data={dataDashboard.product}
                icon={<FaRegLightbulb />}
              />
            </div>
          </div>
          <div className={clsx(styles.itemContainer, "col sm12 md4 lg4")}>
            <div className={styles.dashboardItem}>
              <DashBoardCard
                title={
                  currentRole === "Admin" || currentRole === "QA Manager"
                    ? "Payment"
                    : "Pending Requests"
                }
                data={
                  currentRole === "Admin" || currentRole === "QA Manager"
                    ? dataDashboard.payment
                    : "19"
                }
                icon={<AiOutlineRise />}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className={styles.bodyCard}>
        <div className={clsx("row")}>
          <div className={clsx("col lg6", styles.containerChart)}>
            <div className={styles.columnChart}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataBar}
                  barGap={4}
                  barSize={10}
                  barCategoryGap={20}
                  wrapperStyle={{
                    paddingBottom: "30px",
                  }}
                >
                  <CartesianGrid stroke="#eee" vertical={false} />
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Legend
                    wrapperStyle={{
                      paddingTop: "30px",
                      paddingBottom: "20px",
                    }}
                    verticalAlign={"top"}
                    align={"right"}
                  />
                  <Bar dataKey="Marketing" fill="rgba(254, 112, 150, 1)" />
                  <Bar dataKey="Business" fill="rgba(154, 85, 255, 1)" />
                  <Bar dataKey="IT" fill="rgba(54, 215, 232, 1)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={clsx("col lg6", styles.containerChart)}>
            <div className={styles.pipeChart}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={dataPipe}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Recent */}
      <div className={styles.bodyCard}>
        <div className={styles.recentContainer}>
          <h4 className={styles.recentTitle}>Recent Update</h4>
          <div className={styles.recentTime}>
            <div className={styles.recentLeft}>
              <FaRegUser className={styles.recentIcon} />
              <span className={styles.recentText}>Do thi Thu Hien</span>
            </div>
            <div className={styles.recentRight}>
              <AiOutlineClockCircle className={styles.recentIcon} />
              <span className={styles.recentText}>Friday, April 8 2023</span>
            </div>
          </div>
          <div className={styles.recentList}>
            <div className={styles.recentItem}>
              <img src={dashboardImg1} alt="recent img" />
            </div>
            <div className={styles.recentItem}>
              <img src={dashboardImg2} alt="recent img" />
            </div>
            <div className={styles.recentItem}>
              <img src={dashboardImg3} alt="recent img" />
            </div>
            <div className={styles.recentItem}>
              <img src={dashboardImg4} alt="recent img" />
            </div>
          </div>
          <div className={styles.cmt}>
            <img src={recentUser} alt="recent user" />
            <div className={styles.cmtContent}>
              <h5>School Website - Authentication Module.</h5>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.{" "}
              </p>
            </div>
            <div className={clsx(styles.reaction)}>
              {reaction ? (
                <AiFillHeart
                  className={clsx(styles.heartActive, styles.reactBtn)}
                  onClick={() => setReaction(false)}
                />
              ) : (
                <AiOutlineHeart
                  className={styles.reactBtn}
                  onClick={() => setReaction(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Popular Product */}
      <div className={styles.bodyCard}>
        <div className="row">
          <div className={clsx("col sm12 md12 lg6")}>
            <div className={styles.popular}>
              <Table
                loading={false}
                head={<PopularTableHead />}
                renderRows={renderRows}
                data={products}
              />
            </div>
          </div>
          <div className={clsx("col sm12 md12 lg6")}>
            {/* Todo List */}
            <div className={styles.todo}>
              <form className={styles.todoForm} onSubmit={handleSubmitTodo}>
                <Input
                  onChange={handleOnChange}
                  config={{
                    name: "task_name",
                    type: "text",
                    className: styles.todoInput,
                    placeholder: "What do you need to do today?",
                    value: task,
                  }}
                />
                <Button
                  className={styles.addBtn}
                  type={"submit"}
                  buttonSize={"btnMedium"}
                  buttonStyle={"btnPurpleSolid"}
                >
                  Add
                </Button>
              </form>
              {todo.map((item, index) => (
                <div
                  key={`${item.name} - ${index}`}
                  className={styles.taskItem}
                >
                  <label htmlFor="done" className={styles.checkLabel}>
                    <Input
                      onChange={() => handleOnChangeCheck(index)}
                      config={{
                        id: "done",
                        className: styles.checkInput,
                        name: "status",
                        type: "checkbox",
                        value: "",
                        checked: item.status,
                      }}
                    />
                    <i className={styles.inputHelper}></i>
                  </label>
                  <span
                    className={clsx(
                      styles.taskName,
                      item.status === true ? styles.active : ""
                    )}
                  >
                    {item.name}
                  </span>
                  <TiDeleteOutline
                    className={styles.taskRemoveBtn}
                    onClick={() => handleDeleteTask(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardList;
