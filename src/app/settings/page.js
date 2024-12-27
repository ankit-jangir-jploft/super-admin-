"use client";
import Sidebar from "../Components/Sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import CustomRadioButton from "../Components/CustomRadioButton";
import Image from "next/image";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";
import { Badge, Tab, Tabs } from "react-bootstrap";
import { BASE_URL } from "../Utils/apiHelper";
import { GET, POST } from "../Utils/apiFunctions";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const page = () => {
  const [fetchSeller, setFetchSeller] = useState();

  let [count, setCount] = useState(0);

  const [file, setFile] = useState();
  const [roleType, setRoleType] = useState();
  
    useEffect(() => {
      // Fetch roleType only on the client side
      setRoleType(Cookies.get("roleType"));
    }, []);

  function handleChange1(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const [value, setValue] = useState("");

  const {
    handleSubmit,
    formState: { errors: errorsGenralSetting },
    register,
    control,
    reset,
  } = useForm({
    defaultValues: {
      status: false,
      budget: "Jan",
      default_vat_class: "25",
      language_id: "1",
      title: "",
      text: "",
      setting_id: null,
    },
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [settingId, setSettingId] = useState(null);

  const fetchHandler = async () => {
    try {
      const res = await GET(`${BASE_URL}/api/admin/generalSettingList`);

      if (res?.data?.status && res?.data?.data) {
        const settings = res?.data?.data[0];

        // Populate form with fetched settings
        setIsEditMode(true); // Indicate we're in update mode
        setSettingId(settings.setting_id); // Store the setting ID
        reset({
          status: settings.status,
          budget: settings.budget,
          default_vat_class: settings.default_vat_class,
          language_id: settings.language_id,
          title: settings.title,
          text: settings.text,
          setting_id: settings.setting_id, // Hidden field
        });
      } else {
        setIsEditMode(false); // No settings found, enable create mode
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      // toast.error("Failed to load settings.");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        // Update existing settings
        const res = await POST(`${BASE_URL}/api/admin/generalSettingCreate`, {
          ...data,
          setting_id: settingId,
        });

        if (res?.data?.status) {
          toast.success("Settings updated successfully");
        }
      } else {
        // Create new settings
        const res = await POST(
          `${BASE_URL}/api/admin/generalSettingCreate`,
          data
        );

        if (res?.data?.status) {
          toast.success("Settings created successfully");
        }
      }
    } catch (error) {
      console.error("Error submitting settings:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    fetchHandler();
    fetchFaqList();
    fetchSellerList();
    fetchFrontPageSettings();
  }, []);

  const [faqList, setFaqList] = useState([
    {
      question: "How do I share my online store?",
      answer: "Lorem ipsum dolor sit amet",
    },
  ]);

  const [errorMessages, setErrorMessages] = useState([]);

  const handleAddQuestion = () => {
    setFaqList([...faqList, { question: "", answer: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedFaqList = [...faqList];
    updatedFaqList[index][field] = value;
    setFaqList(updatedFaqList);
  };

  const handleSave = async () => {
    let errors = [];

    // Validate each FAQ question and answer
    faqList.forEach((faq, index) => {
      if (!faq.question || !faq.answer) {
        errors[index] = "Both question and answer are required.";
      } else {
        errors[index] = ""; // Clear the error if valid
      }
    });

    // If there are any errors, update the state and stop execution
    if (errors.some((error) => error !== "")) {
      setErrorMessages(errors);
      return; // Stop the save operation if there are validation errors
    }

    // Proceed with saving the data if no errors
    try {
      const response = await POST(`${BASE_URL}/api/admin/faqCreate`, {
        language_id: 1,
        items: faqList.map((faq) => ({
          question: faq?.question,
          answer: faq?.answer,
        })),
      });

      if (response?.data?.status === true) {
        toast.success("Faq Created SuccessFully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchFaqList = async () => {
    const response = await GET(`${BASE_URL}/api/admin/faqList`);
    const allFaqs = response?.data?.data;
    if (allFaqs) {
      const mappedFaqs = allFaqs.map((faq) => ({
        question: faq?.question,
        answer: faq?.answer,
      }));

      setFaqList(mappedFaqs);
    }
  };

  const fetchSellerList = async () => {
    const response = await GET(`${BASE_URL}/api/admin/sellerList`);
    setFetchSeller(response?.data);
  };

  const [headerLogo, setHeaderLogo] = useState(null);
  const [headerImage, setHeaderImage] = useState(null);

  const [headerLogoFile, setHeaderLogoFile] = useState(null);
  const [headerImageFile, setHeaderImageFile] = useState(null);

  const [headerLogoFileError, setHeaderLogoFileError] = useState(null);
  const [headerImageFileError, setHeaderImageFileError] = useState(null);

  // Initialize the form using react-hook-form
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    reset: reset3,
    formState: { errors },
  } = useForm({
    defaultValues: {
      navbarLanguage: "1",
    },
  });

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeaderLogoFile(file);
      setHeaderLogoFileError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeaderImageFile(file);
      setHeaderImageFileError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit3 = async (data) => {
    // Check if files are selected, otherwise set error messages
    if (!(headerLogoFile || headerLogo)) {
      setHeaderLogoFileError("Logo is required.");
    } else {
      setHeaderLogoFileError(null);
    }

    if (!(headerImageFile || headerImage)) {
      setHeaderImageFileError("Header image is required.");
    } else {
      setHeaderImageFileError(null);
    }

    if (!(headerLogoFile || headerLogo) || !(headerImageFile || headerImage)) {
      return;
    }

    const formData = new FormData();
    formData.append("language_id", data.navbarLanguage);
    formData.append("type", "nav_one");
    formData.append("header_title", data?.headerTitle);
    formData.append("header_description", data?.headerDescription);
    formData.append("header_label", data?.headerButtonLabel || "");
    formData.append("id", data?.id);

    if (headerLogoFile) {
      formData.append("logo_image", headerLogoFile);
    }

    if (headerImageFile) {
      formData.append("header_image", headerImageFile);
    }

    try {
      const response = await POST(
        `${BASE_URL}/api/admin/frontPageSettingCreate`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response);

      if (response.status === 201) {
        toast.success("Form submitted successfully!");
      }
    } catch (error) {
      console.error("Form submission error:", error.message);
      toast.error("There was an error submitting the form.", error.message);
    }
  };

  // Fetch and populate front page settings
  const fetchFrontPageSettings = async () => {
    try {
      const response = await GET(`${BASE_URL}/api/admin/frontPageSettingList`);
      if (response?.status === 200) {
        const fetchFrontPageSetting = response?.data?.data[0];

        // Populate the fields in the form
        reset3({
          navbarLanguage: fetchFrontPageSetting?.language_id || "1",
          headerTitle: fetchFrontPageSetting?.header_title || "",
          headerDescription: fetchFrontPageSetting?.header_description || "",
          headerButtonLabel: fetchFrontPageSetting?.header_label || "",
          id: fetchFrontPageSetting?.id || "",
        });

        // Set the preview images if available
        if (fetchFrontPageSetting?.logo_image) {
          setHeaderLogo(`${fetchFrontPageSetting?.logo_image}`); // Set preview base64 or URL
          setHeaderLogoFile(null); // Make sure file state is cleared since it's just a URL/image path now
        }

        if (fetchFrontPageSetting?.header_image) {
          setHeaderImage(`${fetchFrontPageSetting?.header_image}`); // Set preview base64 or URL
          setHeaderImageFileError(null); // Clear any errors if the image exists
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main stng-pge'>
        <div className='admin-header'>
          <h2>Settings</h2>
          <div className='search-frm'>
            <input
              type='text'
              placeholder='Sok i order'
            />
            <Link href={"/"}>
              <img src='/images/notifications_none.svg' />
            </Link>
            <Link href={"/"}>
              <img src='/images/avatar-style.png' />
            </Link>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className='shdw-crd crte-ordr'>
              <Tabs
                defaultActiveKey='general'
                id='uncontrolled-tab-example'
                className='mb-3'
              >
                <Tab
                  eventKey='general'
                  title='General'
                >
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row mt-5'>
                      <div className='col-md-6'>
                        <div className='cstm-chk'>
                          <Form.Group
                            className='mb-3'
                            controlId='formBasicCheckbox'
                          >
                            <Form.Check className="form_checkbox_top"
                              type='checkbox'
                              label='Automatically unpublish items in the online store with less than 100 pieces in stock'
                              {...register("status")}
                              value='1'
                              onChange={(e) =>
                                setValue("status", e.target.checked ? "1" : "0")
                              }
                            />
                          </Form.Group>
                        </div>
                      </div>

                      {/* Hidden field for setting_id */}
                      <input
                        type='hidden'
                        {...register("setting_id")}
                      />

                      <div className='col-md-6'>
                      {roleType !== 'guest' &&
                        <div className='bot-btn justify-content-end'>
                          <button
                            type='submit'
                            className='btn btn-primary w-25 p-2'
                          >
                            {isEditMode ? "Update Settings" : "Create Settings"}
                          </button>
                        </div> }
                      </div>
                      <div className='row'>
                        <div className='col-md-12'>
                          <Form.Label>Budget</Form.Label>
                          <CustomRadioButton />
                        </div>
                      </div>
                      <div className='col-md-6 mt-4'>
                        <div className='row'>
                          <div className='col-md-12'>
                            <Form.Group className='mb-3'>
                              <Form.Label>Default VAT class</Form.Label>
                              <Form.Select {...register("default_vat_class")}>
                                <option value='0'>0%</option>
                                <option value='12'>12%</option>
                                <option value='15'>15%</option>
                                <option value='25'>25%</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                        </div>

                        <Form.Group className='mb-3'>
                          <Form.Label>Language</Form.Label>
                          <Form.Select {...register("language_id")} className="LanguageBox">
                            <option value='1'>English</option>
                            {/* <option value="2">Korea</option> */}
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                          <Form.Label>Terms of Purchase</Form.Label>
                          {/* <Form.Control
                            placeholder='Terms of purchase'
                            {...register("title", {
                              required: "Terms is required",
                            })}
                          />
                          {errorsGenralSetting.title && (
                            <p className='text-danger'>
                              {errorsGenralSetting.title.message}
                            </p>
                          )} */}
                        </Form.Group>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-12'>
                        <Form.Group className='mb-3'>
                          <Form.Label>Text</Form.Label>
                          <Controller
                            name='text'
                            control={control}
                            render={({ field }) => (
                              <ReactQuill
                                theme='snow'
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </Form>
                </Tab>
                <Tab
                  eventKey='dugnadssettings'
                  title='Dugnadssettings'
                >
                  <h5 className='ad-prdtse mt-4 mb-3'>
                    Dugnadssettings
                    <Form.Select className='ms-3'>
                      <option>English</option>
                    </Form.Select>
                  </h5>
                  <div className='row'>
                    <div className='col-md-6'>
                      <Form.Label className='d-block'>
                        Default text when sharing on social media
                      </Form.Label>
                      <Form.Label className='d-block mt-4'>
                        Default image when sharing on social media
                      </Form.Label>
                    </div>
                    <div className='col-md-6 text-end'>
                      <Form.Group className='mb-3'>
                        <Form.Control placeholder='Thank you for your support!' />
                      </Form.Group>
                      <img
                        className='strimg'
                        src='/images/store-im.png'
                      />
                    </div>
                  </div>
                  <Form.Label>Frequently asked questions</Form.Label>
                  <div className='row'>
                    {faqList.map((faq, index) => (
                      <React.Fragment key={index}>
                        <div className='col-md-6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>Question {index + 1}</Form.Label>
                            <Form.Control
                              value={faq.question}
                              onChange={(e) =>
                                handleChange(index, "question", e.target.value)
                              }
                              placeholder='How do I share my online store?'
                            />
                            {errorMessages[index] && (
                              <div
                                className='text-danger'
                                style={{ fontSize: "12px" }}
                              >
                                {errorMessages[index]}
                              </div>
                            )}
                          </Form.Group>
                        </div>
                        <div className='col-md-6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                              value={faq.answer}
                              onChange={(e) =>
                                handleChange(index, "answer", e.target.value)
                              }
                              placeholder='Lorem ipsum dolor sit amet'
                            />
                            {errorMessages[index] && (
                              <div
                                className='text-danger'
                                style={{ fontSize: "12px" }}
                              >
                                {errorMessages[index]}
                              </div>
                            )}
                          </Form.Group>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>

                  <div className='row mt-3'>
                    <div className='col-md-6'>
                    {roleType !== 'guest' &&
                      <div className='bot-btn add-quet'>
                        <button
                          type='button'
                          className='btn btn-primary w-50 p-2'
                          onClick={handleAddQuestion}
                        >
                          Add question and answer
                        </button>
                      </div> }
                    </div>
                    <div className='col-md-6'>
                    {roleType !== 'guest' &&
                      <div
                        className='bot-btn justify-content-end'
                        onClick={handleSave}
                      >
                        <button className='btn btn-primary w-25 p-2'>
                          Save
                        </button>
                      </div> }
                    </div>
                  </div>
                </Tab>
                <Tab
                  eventKey='Frontpagesettings'
                  title='Frontpage settings'
                >
                  <div className='row'>
                    <div className='col-md-8 mx-auto'>
                      <Form.Label className='ad-prdtse mt-4 mb-3'>
                        Language
                        <Form.Select
                          className='ms-3 p-1'
                          {...register3("navbarLanguage", {
                            required: "Navbar language is required",
                          })}
                        >
                          <option value='1'>Norwegian</option>
                          <option value='1'>Sweden</option>

                        </Form.Select>
                        {errors.navbarLanguage && (
                          <p className='text-danger block'>
                            {errors.navbarLanguage.message}
                          </p>
                        )}
                      </Form.Label>

                      {/* <ul className='nvbre-txt'>
                        <li>Nav One</li>
                        <li>Nav Two</li>
                        <li>Nav Three</li>
                        <li>Nav Four</li>
                        <li>Nav Five</li>
                      </ul> */}

                      <input
                        type='hidden'
                        {...register3("id")}
                      />

                      <div className='row'>
                        <div className='col-md-6'>
                          {/* <Form.Label className='mt-4'>Upload Logo</Form.Label>
                          <div className='crpr-im filr-setng'>
                            {headerLogo && (
                              <img
                                src={headerLogo}
                                alt='Logo Preview'
                                className='rounded-circle m-4'
                                width={100}
                                height={100}
                              />
                            )}
                            <div className='cstm-fle'>
                              <input
                                type='file'
                                onChange={handleLogoChange}
                                accept='image/*' // Ensure only image files can be selected
                              />
                              <img
                                src='/images/image-upload1.svg'
                                alt='Upload icon'
                              />
                              <p className='m-0'>
                                Drag & Drop or <span>choose file</span> to
                                upload
                              </p>
                              <small>Supported formats: Jpeg, png</small>
                            </div>
                          </div> */}
                          {/* {headerLogoFileError && (
                            <p className='text-danger'>{headerLogoFileError}</p>
                          )} */}

                          <Form.Group className='mt-4'>
                            <Form.Label>Header Title</Form.Label>
                            <Form.Control
                              placeholder='Lorem Ipsum is simply dummy text of the printing and typesetting'
                              {...register3("headerTitle", {
                                required: "Header Title is required",
                              })}
                            />
                            {errors.headerTitle && (
                              <p className='text-danger'>
                                {errors.headerTitle.message}
                              </p>
                            )}
                          </Form.Group>

                          <Form.Group className='mb-3'>
                            <Form.Label>Header Description</Form.Label>
                            <Form.Control
                              placeholder='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
                              {...register3("headerDescription", {
                                required: "Header Description is required",
                              })}
                            />
                            {errors.headerDescription && (
                              <p className='text-danger'>
                                {errors.headerDescription.message}
                              </p>
                            )}
                          </Form.Group>

                          <Form.Group className='mb-3'>
                            <Form.Label>Header Button Label</Form.Label>
                            <Form.Control
                              placeholder='Header Button Label'
                              {...register3("headerButtonLabel", {
                                required: "Button Label is required",
                              })}
                            />
                            {errors.headerButtonLabel && (
                              <p className='text-danger'>
                                {errors.headerButtonLabel.message}
                              </p>
                            )}
                          </Form.Group>
                        </div>

                        <div className='col-md-6' style={{ marginTop: "-33px" }}>
                          <Form.Label className='mt-4'>Header Image</Form.Label>
                          <div className='crpr-im filr-setng filr-setng1'>

                            <Image
                              src={headerImage || '/images/image-upload1.svg' }
                              alt='Header Image Preview'
                              className='rounded-circle m-4'
                              width={100}
                              height={100}
                            />

                            <div className='cstm-fle'>
                              <input
                                onChange={handleImageChange}
                                type='file'
                              />
                              <img
                                 src='/images/image-upload1.svg'
                                alt='Upload icon'
                              />
                              <p className='m-0'>
                                Drag & Drop or <span>choose file</span> to
                                upload
                              </p>
                              <small>Supported formats: Jpeg, png</small>
                            </div>
                          </div>
                          {headerImageFileError && (
                            <p className='text-danger'>
                              {headerImageFileError}
                            </p>
                          )}
                        </div>
                      </div>
                      {roleType !== 'guest' &&
                      <div className='d-flex justify-content-center mt-20'>
                        <button
                          className='btn btn-primary w-25'
                          type='submit'
                          onClick={handleSubmit3(onSubmit3)}
                        >
                          Submit
                        </button>
                      </div> }
                    </div>
                  </div>
                </Tab>
                <Tab
                  eventKey='users'
                  title='Users'
                >
                  {roleType !== 'guest' &&
                  <div className='text-end' style={{ marginTop: "20px" }}>
                    <Link
                      href='/createuser'
                      className='crte-userd CreateUserCustom'
                    >
                      Create User
                    </Link>
                  </div> }

                  <div className='table-responsive order-table'>
                    <table>
                      <thead>
                        <tr>
                          <th>Profile</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Type</th>
                          <th>Email</th>
                          {roleType !== 'guest' &&
                          <th></th> }
                        </tr>
                      </thead>
                      <tbody>
                        {fetchSeller?.data?.map((row, index) => (
                          <tr key={row?.id}>
                            <td>

                              <Image
                                src={row?.profile_image}
                                alt="Profile Image"
                                width={40}
                                height={40}
                                className='rounded-circle'
                                crossOrigin="anonymous"
                              />

                            </td>
                            <td>{row?.name}</td>
                            <td>
                              <Badge bg='success'>
                                {row?.status === 1 ? "Active" : "Inactive"}
                              </Badge>
                            </td>
                            <td>
                              {row?.role_id === 2 ? "Seller" : "Customer"}
                            </td>
                            <td>{row?.email}</td>
                            {roleType !== 'guest' &&
                            <td>
                              <Link href={`/useredit/${row?.id}`}>
                                <img src="/images/edit-icn.svg" alt="Edit" />
                              </Link>
                            </td> }
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
