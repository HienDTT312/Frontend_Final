import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { MdOutlineArrowDropDown, MdHouse } from "react-icons/md";
import { FaGraduationCap, FaFacebookF } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

import vuNam from "../../../assets/customer/avatar/vuNam.jpeg";
import coverImg from "./../../../assets/background/defaultCover.jpg";
import Switch from "../../../component/switch/Switch";
import styles from "./CustomerProfile.module.css";
import Spinner from "../../../component/spinner/Spinner";
import Input from "../../../component/input/Input";
import Select from "../../../component/select/Select";
import Button from "../../../component/button/Button";

const nav = [
  {
    name: "Post",
  },
  {
    name: "About",
  },
  {
    name: "Friend",
  },
  {
    name: "Photo",
  },
  {
    name: "Video",
  },
  {
    name: "More",
    icon: <MdOutlineArrowDropDown />,
  },
];

const previewFriend = [
  {
    name: "Meo",
    path: vuNam,
  },
  {
    name: "Hien",
    path: vuNam,
  },
  {
    name: "Hien",
    path: vuNam,
  },
  {
    name: "Hien",
    path: vuNam,
  },
  {
    name: "Vũ Nam",
    path: vuNam,
  },
  {
    name: "Hien",
    path: vuNam,
  },
  {
    name: "Hien",
    path: vuNam,
  },
  {
    name: "Thị Anh",
    path: vuNam,
  },
  {
    name: "Hien",
    path: vuNam,
  },
];

function CustomerProfile() {
  const currentCustomer = JSON.parse(localStorage.getItem("currentCustomer"));
  const [customer, setCustomer] = useState(currentCustomer);
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState("");
  const [oldImage, setOldImage] = useState(false);

  const configInput = (
    id,
    className,
    nameAtt,
    type,
    value,
    placeholder,
    accept,
    disabled,
    hidden,
    required = false,
    checked = false
  ) => {
    return {
      id: id,
      className: className,
      name: nameAtt,
      type: type,
      value: value,
      placeholder: placeholder,
      accept: accept,
      disabled: disabled,
      hidden: hidden,
      required: required,
      checked: checked,
    };
  };

  const handleOnChange = (target) => {
    if (target.name === "avatar") {
      // Change preview avatar by using FileReader
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      setOldImage(true);
      return setCustomer({ ...customer, [target.name]: target.files[0] });
    }
    setCustomer({ ...customer, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSwitch = (value) => {
    setEditMode(value);
  };

  if (customer === null) {
    return (
      <div>
        <Spinner />
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Avatar */}
      <div className={styles.card}>
        <div className={styles.header}>
          <img className={styles.coverImg} src={coverImg} alt="cover img" />
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <img
              className={styles.avatar}
              src={`http://localhost:3001/${currentCustomer.avatar}`}
              alt="avatar"
            />
            <div className={styles.info}>
              <h2>{currentCustomer.full_name}</h2>
              <p>240 Friends</p>
            </div>
          </div>
          <div className={styles.right}>
            <p className={styles.editMode}>
              <span className={styles.editText}>
                <HiPencil className={styles.editIcon} />
                Edit Profile
              </span>
              <Switch onChange={handleSwitch} isChecked={editMode} />
            </p>
          </div>
        </div>
        <div className={styles.footer}>
          <ul className={styles.nav}>
            {nav.map((item, index, nav) => (
              <Link
                className={
                  index === 0
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
                key={index}
                to=""
              >
                {item.name}
                {index + 1 === nav.length && item.icon}
              </Link>
            ))}
          </ul>
        </div>
      </div>
      {/* Content */}
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <div className={styles.item}>
            <span className={styles.title}>About</span>
            <p className={styles.aboutContent}>Hello World</p>
            <ul className={styles.aboutList}>
              <li className={styles.aboutItem}>
                <FaGraduationCap className={styles.aboutIcon} />
                <span>
                  Went to <strong>Greenwich Viet Nam</strong>
                </span>
              </li>
              <li className={styles.aboutItem}>
                <MdHouse className={styles.aboutIcon} />
                <span>
                  Lives in <strong>Hanoi, VietNam</strong>
                </span>
              </li>
              <li className={styles.aboutItem}>
                <AiFillHeart className={styles.aboutIcon} />
                <span>Single</span>
              </li>
              <li className={styles.aboutItem}>
                <BsInstagram className={styles.aboutIcon} />
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li className={styles.aboutItem}>
                <FaFacebookF className={styles.aboutIcon} />
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>Friend</span>
            <p className={styles.titleFriend}>240 friends</p>
            <div className={styles.friendList}>
              {previewFriend.map((friend, index) => (
                <div key={index} className={styles.friendItem}>
                  <div className={styles.friendAvt}>
                    <img src={friend.path} alt="friends avt" />
                  </div>
                  <p className={styles.friendName}>{friend.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.containerRight}>
          <div className={styles.item}>
            <span style={{ marginBottom: "20px" }} className={styles.title}>
              Personal Information
            </span>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName" className={styles.label}>
                  Full Name
                </label>
                <Input
                  onChange={handleOnChange}
                  config={configInput(
                    "fullName",
                    styles.formInput,
                    "full_name",
                    "text",
                    customer.full_name,
                    "Your Full Name",
                    undefined,
                    !editMode
                  )}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  First Name
                </label>
                <Input
                  onChange={handleOnChange}
                  config={configInput(
                    "firstName",
                    styles.formInput,
                    "first_name",
                    "text",
                    customer.first_name,
                    "Your First Name",
                    undefined,
                    !editMode
                  )}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name
                </label>
                <Input
                  onChange={handleOnChange}
                  config={configInput(
                    "lastName",
                    styles.formInput,
                    "last_name",
                    "text",
                    customer.last_name,
                    "Your First Name",
                    undefined,
                    !editMode
                  )}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Gender</label>
                <div className={styles.radioContainer}>
                  <div className={styles.radioContent}>
                    <Input
                      onChange={handleOnChange}
                      config={configInput(
                        "male",
                        styles.radioInput,
                        "gender",
                        "radio",
                        "male",
                        undefined,
                        undefined,
                        !editMode,
                        undefined,
                        undefined,
                        customer.gender === "male"
                      )}
                    />
                    <label htmlFor="male" className={styles.radioLabel}>
                      Male
                    </label>
                  </div>
                  <div className={styles.radioContent}>
                    <Input
                      onChange={handleOnChange}
                      config={configInput(
                        "female",
                        styles.radioInput,
                        "gender",
                        "radio",
                        "female",
                        undefined,
                        undefined,
                        !editMode,
                        undefined,
                        undefined,
                        customer.gender === "female"
                      )}
                    />
                    <label htmlFor="female" className={styles.radioLabel}>
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Phone
                </label>
                <Input
                  onChange={handleOnChange}
                  config={configInput(
                    "phone",
                    styles.formInput,
                    "phone",
                    "text",
                    customer.phone,
                    "Your Phone",
                    undefined,
                    !editMode
                  )}
                />
              </div>
              <Button
                type={"submit"}
                buttonSize={"btnLarge"}
                buttonStyle={"btnPurpleSolid"}
              >
                Confirm
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
