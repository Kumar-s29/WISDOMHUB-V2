import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddMentor = () => {
  const [menImg, setMenImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("IT & Technology");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);
  const onsubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!menImg) {
        return toast.error("Please select mentor image");
      }
      const formData = new FormData();
      formData.append("image", menImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fee", Number(fee));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      //console log formdata
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-mentor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setMenImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setFee("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast
        .error("Failed to add mentor")
        .then(() => toast.error("Please try again"));
    }
  };
  return (
    <form className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Mentor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
        <div className="flex items-center  gap-4 mb-8 text-gray-500 ">
          <label htmlFor="men-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={menImg ? URL.createObjectURL(menImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setMenImg(e.target.files[0])}
            type="file"
            id="men-img"
            hidden
          />
          <p>
            Upload mentor <br />
            picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex-col gap-1">
              <p>Mentor name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="name"
                required
                value={name}
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Mentor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="email"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Mentor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="password"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="1 year">1 Year</option>
                <option value="2 year">2 Year</option>
                <option value="3 year">3 Year</option>
                <option value="4 year">4 Year</option>
                <option value="5 year">5 Year</option>
                <option value="6 year">6 Year</option>
                <option value="7 year">7 Year</option>
                <option value="8 year">8 Year</option>
                <option value="9 year">9 Year</option>
                <option value="10 year">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Fee</p>
              <input
                onChange={(e) => setFee(e.target.value)}
                value={fee}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="fee"
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="Technolgy & IT">Technolgy & IT</option>
                <option value="Health and Wellness">Health and Wellness</option>
                <option value="Education">Education</option>
                <option value="Career Development">Career Development</option>
                <option value="Arts & Creativity">Arts & Creativity</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
              </select>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address2"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Mentor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            rows={5}
            placeholder="Write about Mentor"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-primary px-10 py-3 mt04 text-white rounded-full"
        >
          Add mentor
        </button>
      </div>
    </form>
  );
};

export default AddMentor;
