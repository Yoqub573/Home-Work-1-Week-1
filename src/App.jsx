import {React,useState,useEffect} from "react";
import axios from "axios";
import { Button, Input, Modal } from "antd";
import { unstableSetRender } from "antd";
import { createRoot } from "react-dom/client";
import Contact from "./assets/Contact Us.svg";
import Client from "./assets/Client (1).png";
import browse from "./assets/browse.png";
import Card1 from "./assets/Group 1.svg";
import Card2 from "./assets/Group 2.svg";
import Card3 from "./assets/Section (1).svg";
import Card4 from "./assets/Section (2).svg";
import Card5 from "./assets/Section (3).svg";
import Page from "./assets/Page.svg";
import Page2 from "./assets/Pricing Table.svg";
import footer from "./assets/Footer.svg";
import "./App.css";
unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});
import { devUseWarning } from "antd/es/_util/warning";

const App = () => {
   let api = "http://37.27.29.18:8001/api/to-dos";

  let [data, setData] = useState([]);
  let [searchName, setsearchName] = useState("");
  let [searchStatus, setsearchStatus] = useState("");

  async function get() {
    try {
      let { data } = await axios.get(api);
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  let [addModal, setaddModal] = useState(false);

  async function addUser(event) {
    event.preventDefault();
    let target = event.target;

    let formData = new FormData();
    formData.append("Name", target["addName"].value);
    formData.append("Description", target["addDescription"].value);

    for (let i = 0; i < target["addImage"].files.length; i++) {
      formData.append("Images", target["addImage"].files[i]);
      console.log(target["addImage"].files[i]);
    }
    try {
      await axios.post(api, formData);
      get();
      setaddModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  let [editModal, seteditModal] = useState(false);
  let [defaultData, setdefaultData] = useState("");

  function openModal(user) {
    seteditModal(true);
    setdefaultData(user);
  }

  async function editUser(event, id) {
    event.preventDefault();
    let target = event.target;

    let update = {
      id: id,
      name: target["editName"].value,
      description: target["editDescription"].value,
    };

    try {
      await axios.put(api, update);
      get();
      seteditModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function delUser(id) {
    try {
      await axios.delete(`${api}?id=${id}`);
      get();
    } catch (error) {
      console.error(error);
    }
  }

  async function changeStatus(id) {
    try {
      await axios.put(`http://37.27.29.18:8001/completed?id=${id}`);
      get();
    } catch (error) {
      console.error(error);
    }
  }

  let [infoModal, setinfoModal] = useState(false);
  let [infoData, setInfoData] = useState({
    name: "",
    description: "",
    images: [],
  });

  async function infoUser(id) {
    try {
      let { data } = await axios.get(`${api}/${id}`);
      setInfoData(data.data);
      setinfoModal(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    get();
  }, []);
  
  return (
    <div className="text-white">
      <div className="bg-[url(./assets/image.png)] bg-no-repeat bg-cover">
        <header className="flex justify-between max-w-[80%] w-[80%] m-auto pt-[50px]">
          <div
            style={{ backdropFilter: "blur(51.400001525878906px)" }}
            className="rounded-[38px] py-[40px] px-[50px] border-[1px] w-[48%] h-[450px] border-[#FFFFFF57]"
          >
            <h2 className="text-[41px] font-[500]">
              Where Your Brand Takes Center Stage!
            </h2>
            <br />
            <p className="text-[16px] font-[500]">
              With a blend of creativity, data-driven insights, and industry
              expertise, we develop campaigns that resonate with your audience
              and deliver measurable results.
            </p>
            <br />
            <div className="flex justify-between items-center w-[100%]">
              <div>
                <h3 className="font-[400] text-[35.76px]">295,4K+</h3>
                <p className="text-[18.38px] font-[400]">
                  Digital Partner for Growth
                </p>
              </div>
              <div className="border-[1px] border-white w-[223px] h-[90px] rounded-[15px]"></div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <div className="flex gap-[60px] items-center">
              <div className="flex items-center gap-[40px]">
                <p className="text-[18px] font-[400]">About Us</p>
                <p className="text-[18px] font-[400]">Page</p>
                <p className="text-[18px] font-[400]">Services</p>
              </div>
              <img src={Contact} alt="" />
            </div>
            <div className="text-end flex flex-col">
              <span className="text-[67px]">Unlock Your</span>
              <span className="text-[67px] italic text-right text-[#11F2BE] brand">
                Brand’s Potential
              </span>
              <span className="text-[67px]">with Innovative</span>
            </div>
          </div>
        </header>
        <section className="max-w-[100%] w-[100%] px-[10%] py-[100px] bg-gradient-to-b from-transparent to-black ">
          <div className="w-[100%] flex justify-end">
            <img src={Client} className="w-[300px]" alt="" />
          </div>
          <br />
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-[31px] font-[500]">
                Revolutionizing <br />
                Your Brand
              </h3>
              <br />
              <p className="w-[460px] font-[500]">
                With a blend of creativity, data-driven insights, and industry
                expertise, we develop campaigns that resonate with your audience
                and deliver measurable results.
              </p>
            </div>
            <div className="items-end flex flex-col gap-[30px]">
              <button
                style={{ backdropFilter: "blur(51.400001525878906px)" }}
                className="px-[20px] py-[8px]  text-white rounded-[114px] bg-[#FFFFFF1A] border-[1px] border-[#FFFFFF57]"
              >
                Turning Ideas into Impactful
              </button>
              <div className="flex gap-[20px] items-center">
                <button
                  style={{ backdropFilter: "blur(51.400001525878906px)" }}
                  className="px-[20px] py-[8px]  text-white rounded-[114px] bg-[#FFFFFF1A] border-[1px] border-[#FFFFFF57]"
                >
                  Your Brand Takes
                </button>
                <button
                  style={{ backdropFilter: "blur(51.400001525878906px)" }}
                  className="px-[20px] py-[8px]  text-white rounded-[114px] bg-[#FFFFFF1A] border-[1px] border-[#FFFFFF57]"
                >
                  Future of Advertising
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="max-w-[80%] w-[80%] m-auto py-[100px]">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[67px]">Empowering Brands </span>
            <span className="text-[67px] italic text-[#11F2BE] brand">
              Through Creative{" "}
            </span>
            <span className="text-[67px]">Advertising</span>
          </div>
          <div className="bg-[#C4C4C4] w-[40%] rounded-4xl h-[280.5px]"></div>
        </div>
        <br />
        <br />
        <br />
        <div
          style={{ backdropFilter: "blur(51.400001525878906px)" }}
          className="px-[50px] py-[40px] h-[332px] border-[#11F2BE] w-[100%] bg-[#FFFFFF0A] rounded-[25px] border-2 flex justify-between items-center"
        >
          <img src={Card1} className="w-[30%]" alt="" />
          <img src={Card2} className="w-[30%]" alt="" />
          <img src={Card3} className="w-[23%]" alt="" />
        </div>
      </section>
      <section className="max-w-[80%] w-[80%] m-auto py-[100px] flex justify-between gap-[60px]">
        <div className="bg-[#C4C4C4] w-[40%] rounded-4xl"></div>
        <div className="w-[888px]">
          <div className="flex flex-col">
            <span className="text-[67px]">Transforming Brands</span>
            <span className="text-[67px] italic text-[#11F2BE] brand">into Industry</span>
          </div>
          <br />
          <br />
            <p className="text-[#FFFFFFCC] text-[15px]">
            Whether you're looking to enhance your brand identity, increase engagement, or drive sales, our tailored solutions are designed to meet your unique needs. Partner with us to transform your vision into a compelling narrative that stands out in today’s competitive market.
          </p>
          <br />
          <br />
          <div className="items-end flex flex-wrap gap-[30px]">
              <button style={{ backdropFilter: "blur(51.400001525878906px)" }} className="px-[20px] py-[8px]  text-white rounded-[114px] bg-[#FFFFFF1A] border-[1px] border-[#FFFFFF57]">
                Turning Ideas into Impactful
              </button>
              <button className="px-[20px] py-[8px] text-black rounded-[114px] bg-[#11F2BE]">
                Future of Advertising
              </button>
              <button style={{ backdropFilter: "blur(51.400001525878906px)" }} className="px-[20px] py-[8px]  text-white rounded-[114px] bg-[#FFFFFF1A] border-[1px] border-[#FFFFFF57]">
                Your Brand Takes
              </button>
              <button style={{ backdropFilter: "blur(51.400001525878906px)" }} className="px-[20px] py-[8px]  text-white rounded-[114px] bg-[#FFFFFF1A] border-[1px] border-[#FFFFFF57]">
                Your Brand Takes
              </button>
              <button style={{ backdropFilter: "blur(51.400001525878906px)" }} className="px-[20px] py-[8px]  text-white rounded-[114px] bg-[#FFFFFF1A] border-[1px] border-[#FFFFFF57]">
                Your Brand Takes
              </button>
          </div>
          <br />
          <br />
          <br />
          <div className="flex gap-[40px] items-center">
            <img src={Card4} className="w-[47%]" alt="" />
            <img src={Card5} className="w-[47%]" alt="" />
          </div>
          <br />
          <br />  
          <p className="text-[#FFFFFFCC] ">
            With a blend of creativity, data-driven insights, and industry expertise, we develop campaigns that resonate with your audience
          </p>
        </div>
      </section>
      <Modal title="Add Modal" closable={{ "aria-label": "Custom Close Button" }} open={addModal} onOk={() => document.getElementById("addForm").requestSubmit()} onCancel={() => setaddModal(false)}>
        <form id="addForm" onSubmit={addUser}>
          <Input name="addName" />
          <Input name="addDescription" />
          <Input name="addImage" type="file" multiple />
        </form>
      </Modal>
      <Modal title="Edit Modal" closable={{ "aria-label": "Custom Close Button" }} open={editModal} onOk={() => document.getElementById("editForm").requestSubmit()} onCancel={() => seteditModal(false)}>
        <form id="editForm" onSubmit={(e) => editUser(e, defaultData.id)}>
          <Input defaultValue={defaultData.name} name="editName" />
          <Input
            defaultValue={defaultData.description}
            name="editDescription"
          />
        </form>
      </Modal>
      <Modal title="Info Modal" closable={{ "aria-label": "Custom Close Button" }} open={infoModal} onOk={() => setinfoModal(false)} onCancel={() => setinfoModal(false)}>
        <div>
          <h1 className="font-bold text-2xl">{infoData.name}</h1>
          <p className="py-2">{infoData.description}</p>
          <span
            className={` px-2.5 py-0.5 ${
              infoData.isCompleted
                ? "text-green-500 bg-green-100 rounded"
                : "text-red-500 bg-red-100 rounded"
            }`}
          >
            {infoData.isCompleted ? "active" : "inactive"}{" "}
          </span>
        </div>
      </Modal>
      <section className="max-w-[80%] w-[80%] m-auto py-[100px]">
        <div className="flex gap-[20px] m-auto w-[91%]">
          <span className="text-[57px]">Where Your Brand Takes</span>
          <span className="text-[57px] italic text-[#11F2BE] brand">Center Stage!</span>
        </div>
        <br />
        <p className="text-[#FFFFFFCC] text-[18px] text-center">
          Whether you're looking to enhance your brand identity, increase engagement, or drive sales, our tailored solutions are designed to meet your unique needs. Partner with us to transform your vision into a compelling
        </p>
        <br />
        <br />
        <br />
        <div className="flex items-center gap-[200px] justify-center p-5 w-4/5 m-auto">
        <select  value={searchStatus} style={{ backdropFilter: "blur(51.400001525878906px)" }} className="px-[18px] py-[6px] text-[#11F2BE] rounded-[114px] bg-[#FFFFFF1A] border-[1px] border-[#FFFFFF57]" onChange={(e) => setsearchStatus(e.target.value)}>
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inctive</option>
        </select>
        <Input value={searchName} onChange={(e) => setsearchName(e.target.value)} placeholder="Search..."/>
        <button onClick={() => setaddModal(true)} title="Add New" className="group cursor-pointer outline-none hover:rotate-90 duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300">
            <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5"></path>
            <path d="M8 12H16" strokeWidth="1.5"></path>
            <path d="M12 16V8" strokeWidth="1.5"></path>
          </svg>
        </button>
        </div>
        <br />
        <div className="flex flex-wrap gap-[40px]">
          {data.filter((e) =>e.name.toLowerCase().includes(searchName.toLowerCase())).filter((e) => e.isCompleted.toString().includes(searchStatus)).map((e) => {
            return (
              <div key={e.id} style={{ backdropFilter: "blur(51.400001525878906px)" }} className="shadow-2xl rounded-2xl border-[2px] border-[#11F2BE] w-[47%] p-10 flex flex-col justify-between">
                <div className="flex items-start gap-[10px]">
                  <img src={browse} alt="" className="bg-[#11F2BE1F] p-0.5 rounded-2xl" />
                    <div>
                      <h1 className={`text-[20px] font-bold
                        ${!e.isCompleted
                          ? "line-through"
                          : ""}`}
                          >{e.name}</h1>
                        <p className="py-3.5 text-[16px] ">{e.description}</p>                    
                  </div>
                </div>
                <div className="flex justify-center items-center gap-3">
                  <button onClick={() => openModal(e)} color="blue" variant="outlined" className="bg-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                  <button onClick={() => delUser(e.id)} color="red" variant="outlined" className="bg-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </button>
                  <button onClick={() => infoUser(e.id)} color="orange" variant="outlined" className="bg-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </button>
                  <input onChange={() => changeStatus(e.id)} type="checkbox" checked={e.isCompleted}/>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="max-w-[80%] w-[80%] m-auto py-[100px]">
        <img src={Page} alt="" />
      </section>
      <section className="max-w-[80%] w-[80%] m-auto py-[100px]">
        <img src={Page2} alt="" />
      </section>
      <footer>
        <img src={footer} alt="" />
      </footer>
    </div>
  );
};

export default App;
