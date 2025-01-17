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
  ssr: false, // Disable SSR for this component
});
import "react-quill/dist/quill.snow.css";
import { Badge, Tab, Tabs } from "react-bootstrap";
import { BASE_URL } from "../Utils/apiHelper";
import { GET, POST } from "../Utils/apiFunctions";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const page = ({ searchParams }) => {
  const type = searchParams.type;
  const { t } = useTranslation();
  const [fetchSeller, setFetchSeller] = useState();
  const [userData, setUserData] = useState({});
  const [months, setMonth] = useState({});
  const [defualtActive, setDefault] = useState(
    type == "seller" ? "users" : "general"
  );
  const [dugnadSetting, setDugnadSetting] = useState({
    share_text: "",
    share_image: "",
    preview: "",
  });

  let [count, setCount] = useState(0);

  const [file, setFile] = useState();
  const [roleType, setRoleType] = useState();

  useEffect(() => {
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
      shipping_rate: "",
    },
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [settingId, setSettingId] = useState("");
  const [langId, setLangId] = useState(1);

  const fetchHandler = async () => {
    try {
      const payload = { language_id: langId, setting_id: settingId };
      const res = await GET(
        `${BASE_URL}/api/admin/generalSettingList`,
        payload
      );
      if (res?.data?.status && res?.data?.data) {
        const settings = res?.data?.data[0];
        setIsEditMode(true);
        setSettingId(settings.setting_id);
        setMonth(res?.data?.data[0].months);
        reset({
          status: settings.status,
          budget: settings.budget,
          default_vat_class: settings.default_vat_class,
          language_id: settings.language_id,
          title: settings.title,
          text: settings.text,
          setting_id: settings.setting_id,
          shipping_rate: settings.shipping_rate,
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
          months_data: months,
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

  const [frontLang, setFrontLang] = useState(1);
  const [settingID, setSettingID] = useState("");

  useEffect(() => {
    fetchHandler();

    const userDetails = JSON.parse(Cookies.get("user"));
    setUserData(userDetails);
  }, [langId]);
  useEffect(() => {
    fetchHandler();
    fetchFaqList();
    fetchSellerList();

    const userDetails = JSON.parse(Cookies.get("user"));
    setUserData(userDetails);
  }, []);

  useEffect(() => {
    fetchFrontPageSettings();
  }, [frontLang]);

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

    // Construct FormData object
    const formData = new FormData();
    formData.append("language_id", 1);
    formData.append("setting_id", settingId);

    faqList.forEach((faq, index) => {
      formData.append(`items[${index}][question]`, faq.question);
      formData.append(`items[${index}][answer]`, faq.answer);
    });

    // Add other settings (dugnadSetting fields)
    Object.entries(dugnadSetting).forEach(([key, value]) => {
      if (value instanceof File) {
        // Handle file uploads
        formData.append(key, value);
      } else {
        // Handle other fields
        formData.append(key, value);
      }
    });

    // Proceed with saving the data
    try {
      const response = await POST(`${BASE_URL}/api/admin/faqCreate`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the request is sent as FormData
        },
      });

      if (response?.data?.status === true) {
        toast.success("FAQ Created Successfully");
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

      setDugnadSetting({
        share_text: response?.data?.share?.share_text,
        preview: response?.data?.share?.share_image_url,
        share_image: "",
      });
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
    const maxSize = 2 * 1024 * 1024; // 2MB size limit

    if (file) {
      if (file.size > maxSize) {
        setHeaderImageFileError(
          "The file is too large. Please select a file smaller than 2MB."
        );
        setHeaderImageFile(null);
        return;
      }

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
    formData.append("header_button_link", data?.headerButtonLink || "");
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

      if (response?.data?.status) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Form submission error:", error.message);
      toast.error("There was an error submitting the form.", error.message);
    }
  };

  // Fetch and populate front page settings
  const fetchFrontPageSettings = async () => {
    try {
      const payload = {
        language_id: frontLang,
        setting_id: settingID,
      };
      const response = await GET(
        `${BASE_URL}/api/admin/frontPageSettingList`,
        payload
      );
      if (response?.status === 200) {
        const fetchFrontPageSetting = response?.data?.data[0];

        setSettingID(fetchFrontPageSetting?.id);

        // Populate the fields in the form
        reset3({
          navbarLanguage: fetchFrontPageSetting?.language_id || "1",
          headerTitle:
            fetchFrontPageSetting?.language_id == 1
              ? fetchFrontPageSetting?.header_title
              : fetchFrontPageSetting?.header_title_no,
          headerDescription:
            fetchFrontPageSetting?.language_id == 1
              ? fetchFrontPageSetting?.header_description
              : fetchFrontPageSetting?.header_description_no,
          headerButtonLabel:
            fetchFrontPageSetting?.language_id == 1
              ? fetchFrontPageSetting?.header_label
              : fetchFrontPageSetting?.header_label_no,
          headerButtonLink: fetchFrontPageSetting?.header_button_link || "",
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
          {/* <h2>Settings</h2> */}
          <h2>{t("settings.settings")}</h2>
          {/* <div className='search-frm'>
            <input type='text' />
            <Link href={""}>
              <img src='/images/notifications_none.svg' />
            </Link>
            <Link href={`/useredit/${userData?.id}`}>
              <img
                className='object-fit-cover rounded-circle'
                style={{ width: "41px", height: "41px" }}
                src={userData?.profile_image}
                onError={(e) => {
                  e.target.src = "/images/avatar-style.png";
                }}
              />
            </Link>
          </div> */}
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className='shdw-crd crte-ordr'>
              <Tabs
                defaultActiveKey={defualtActive}
                id='uncontrolled-tab-example'
                className='mb-3'
              >
                <Tab
                  eventKey='general'
                  title={t("settings.generals")}
                >
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row mt-5'>
                      <div className='col-md-6'>
                        <div className='cstm-chk'>
                          <Form.Group
                            className='mb-3'
                            controlId='formBasicCheckbox'
                          >
                            <Form.Check
                              className='form_checkbox_top'
                              type='checkbox'
                              // label='Automatically unpublish items in the online store with less than 100 pieces in stock'
                              label={t(
                                "settings.general.automatically_unpublish"
                              )}
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
                        {roleType !== "guest" && (
                          <div className='bot-btn justify-content-end'>
                            <button
                              type='submit'
                              className='btn btn-primary px-3 p-2'
                            >
                              {isEditMode
                                ? t("settings.general.update_settings")
                                : t("settings.general.create_settings")}
                            </button>
                          </div>
                        )}
                      </div>
                      <div className='row'>
                        <div className='col-md-12'>
                          {/* <Form.Label>Budget</Form.Label> */}
                          <Form.Group>
                            <Form.Label>
                              {t("settings.general.budget")}
                            </Form.Label>
                            <Form.Select
                              className='budget_drp'
                              {...register("budget")}
                            >
                              <option value=''>Select</option>
                              <option value='2025'>2025</option>
                              <option value='2026'>2026</option>
                              <option value='2027'>2027</option>
                              <option value='2028'>2028</option>
                              <option value='2029'>2029</option>
                              <option value='2030'>2030</option>
                              <option value='2031'>2031</option>
                              <option value='2032'>2032</option>
                            </Form.Select>
                          </Form.Group>
                          <CustomRadioButton
                            months={months}
                            setMonth={setMonth}
                          />
                        </div>
                      </div>
                      <div className='col-md-15 mt-4'>
                        <div className='row'>
                          <div className='col-md-5'>
                            <Form.Group className='mb-3'>
                              {/* <Form.Label>Default VAT class</Form.Label> */}
                              <Form.Label>
                                {t("settings.general.default_vat_class")}
                              </Form.Label>
                              <Form.Select {...register("default_vat_class")}>
                                <option value='0'>0%</option>
                                <option value='12'>12%</option>
                                <option value='15'>15%</option>
                                <option value='25'>25%</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                          <div className='col-md-5'>
                            <Form.Group className='mb-3'>
                              {/* <Form.Label>Default VAT class</Form.Label> */}
                              <Form.Label>
                                {t("settings.general.shipping_rate")}
                              </Form.Label>
                              <Form.Control
                                type='number'
                                {...register("shipping_rate")}
                              />
                            </Form.Group>
                          </div>
                        </div>

                        <Form.Group className='mb-3'>
                          {/* <Form.Label>Language</Form.Label> */}
                          <Form.Label>
                            {t("settings.general.language")}
                          </Form.Label>
                          <Form.Select
                            {...register("language_id")}
                            onChange={(e) => {
                              setLangId(e.target.value);
                            }}
                            className='LanguageBox'
                          >
                            <option value={1}>English</option>
                            <option value={2}>Norwegian</option>
                            {/* <option value="2">Korea</option> */}
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                          <Form.Label>{t("")}</Form.Label>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                          <Form.Label>
                            {" "}
                            {t("settings.general.title")}
                          </Form.Label>
                          <Form.Control
                            placeholder='Title'
                            {...register("title", {
                              required: "Terms is required",
                            })}
                          />
                          {errorsGenralSetting.title && (
                            <p className='text-danger'>
                              {errorsGenralSetting.title.message}
                            </p>
                          )}
                        </Form.Group>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-12'>
                        <Form.Group className='mb-3'>
                          {/* <Form.Label>Terms of Purchase</Form.Label> */}
                          <Form.Label>
                            {t("settings.general.terms_of_purchase")}
                          </Form.Label>
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
                  title={t("settings.dugnads_setting")}
                >
                  <h5 className='ad-prdtse mt-4 mb-3'>
                    {/* Dugnadssettings */}
                    {t("settings.dugnads_setting")}
                    <Form.Select className='ms-3'>
                      <option>English</option>
                      <option>Norwegian</option>
                    </Form.Select>
                  </h5>
                  <div className='row'>
                    <div className='col-md-6'>
                      <Form.Label className='d-block'>
                        {/* Default text when sharing on social media */}
                        {t("settings.dugnadssettings.default_text")}
                      </Form.Label>
                      <Form.Label className='d-block mt-4'>
                        {/* Default image when sharing on social media */}
                        {t(
                          "settings.dugnadssettings.default_image_when_sharing_in_social_media"
                        )}
                      </Form.Label>
                    </div>
                    <div className='col-md-6 text-end'>
                      <Form.Group className='mb-3'>
                        <Form.Control
                          value={dugnadSetting.share_text}
                          onChange={(e) => {
                            setDugnadSetting((prev) => ({
                              ...prev,
                              share_text: e.target.value,
                            }));
                          }}
                          placeholder={t(
                            "settings.dugnadssettings.thank_you_for_support"
                          )}
                        />
                      </Form.Group>

                      <div className='crpr-im filr-setng filr-setng1 strimg'>
                        <Image
                          src={
                            dugnadSetting.preview || "/images/image-upload1.svg"
                          }
                          alt='Header Image Preview'
                          className='rounded-circle m-0'
                          width={100}
                          height={100}
                        />

                        <div className='cstm-fle'>
                          <input
                            onChange={(e) => {
                              const file = e.target.files[0];
                              console.log("file", file);
                              if (file) {
                                const maxSize = 1024 * 1024 * 2;
                                if (file.size > maxSize) {
                                  toast.dismiss();
                                  toast.error(
                                    "The file is too large. Please select a file smaller than 2MB."
                                  );
                                  return;
                                }

                                setDugnadSetting((prev) => ({
                                  ...prev,
                                  share_image: file,
                                  preview: URL.createObjectURL(file),
                                }));
                              }
                            }}
                            type='file'
                          />
                          <img
                            src='/images/image-upload1.svg'
                            alt='Upload icon'
                          />
                          <p className='m-0'>
                            {/* Drag & Drop or <span>choose file</span> to
                                upload */}
                            {t("settings.frontpage_settings.drag_drop_or")}{" "}
                            <span>
                              {t("settings.frontpage_settings.choose_file")}
                            </span>{" "}
                            {t("settings.frontpage_settings.to_upload")}
                          </p>
                          <small>Supported formats: Jpeg, png</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <Form.Label>Frequently asked questions</Form.Label> */}
                  <Form.Label>
                    {t("settings.dugnadssettings.frequently_asked_questions")}
                  </Form.Label>
                  <div className='row'>
                    {faqList.map((faq, index) => (
                      <React.Fragment key={index}>
                        <div className='col-md-6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>
                              {t("settings.dugnadssettings.question")}{" "}
                              {index + 1}
                            </Form.Label>
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
                            {/* <Form.Label>Answer</Form.Label> */}
                            <Form.Label>
                              {t("settings.dugnadssettings.answer")}
                            </Form.Label>
                            <Form.Control
                              value={faq.answer}
                              onChange={(e) =>
                                handleChange(index, "answer", e.target.value)
                              }
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
                      {roleType !== "guest" && (
                        <div className='bot-btn add-quet'>
                          <button
                            type='button'
                            className='btn btn-primary w-50 p-2 bnt-borderquc'
                            onClick={handleAddQuestion}
                          >
                            {t(
                              "settings.dugnadssettings.add_question_and_answer"
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className='col-md-6'>
                      {roleType !== "guest" && (
                        <div
                          className='bot-btn justify-content-end'
                          onClick={handleSave}
                        >
                          <button className='btn btn-primary w-50 p-2'>
                            {/* Save */}
                            {t("settings.dugnadssettings.save")}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Tab>
                <Tab
                  eventKey='Frontpagesettings'
                  // title='Frontpage settings'
                  title={t("settings.frontpage_setting")}
                >
                  <div className='row'>
                    <div className='col-md-8 mx-auto'>
                      <Form.Label className='ad-prdtse mt-4 mb-3'>
                        {/* Language */}
                        {t("settings.frontpage_settings.language")}
                        <Form.Select
                          className='ms-3 p-1'
                          {...register3("navbarLanguage", {
                            required: "Navbar language is required",
                          })}
                          onClick={(e) => setFrontLang(e.target.value)}
                        >
                          <option value={1}>English</option>
                          <option value={2}>Norwegian</option>
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

                          <Form.Group className='mb-4'>
                            {/* <Form.Label>Header Title</Form.Label> */}
                            <Form.Label>
                              {t("settings.frontpage_settings.header_title")}
                            </Form.Label>
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
                            {/* <Form.Label>Header Description</Form.Label> */}
                            <Form.Label>
                              {t(
                                "settings.frontpage_settings.header_description"
                              )}
                            </Form.Label>
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
                            {/* <Form.Label>Header Button Label</Form.Label> */}
                            <Form.Label>
                              {t(
                                "settings.frontpage_settings.header_button_label"
                              )}
                            </Form.Label>
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
                          <Form.Group className='mb-3'>
                            {/* <Form.Label>Header Button Label</Form.Label> */}
                            <Form.Label>
                              {t(
                                "settings.frontpage_settings.header_button_link"
                              )}
                            </Form.Label>
                            <Form.Control
                              // placeholder='Header Button Link'
                              {...register3("headerButtonLink", {
                                required: "Button Link is required",
                              })}
                            />
                            {errors.headerButtonLink && (
                              <p className='text-danger'>
                                {errors.headerButtonLink.message}
                              </p>
                            )}
                          </Form.Group>
                        </div>

                        <div
                          className='col-md-6'
                          style={{ marginTop: "-33px" }}
                        >
                          {/* <Form.Label className='mt-4'>Header Image</Form.Label> */}
                          <Form.Label>
                            {t("settings.frontpage_settings.header_image")}
                          </Form.Label>
                          <div className='crpr-im filr-setng filr-setng1'>
                            <Image
                              src={headerImage || "/images/image-upload1.svg"}
                              alt='Header Image Preview'
                              className='rounded-circle m-0'
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
                                {/* Drag & Drop or <span>choose file</span> to
                                upload */}
                                {t("settings.frontpage_settings.drag_drop_or")}{" "}
                                <span>
                                  {t("settings.frontpage_settings.choose_file")}
                                </span>{" "}
                                {t("settings.frontpage_settings.to_upload")}
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
                      <hr />
                      {roleType !== "guest" && (
                        <div className='d-flex justify-content-center my-5'>
                          <button
                            className='btn btn-primary w-25'
                            type='submit'
                            onClick={handleSubmit3(onSubmit3)}
                          >
                            {/* Save */}
                            {t("settings.frontpage_settings.save")}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Tab>
                <Tab
                  eventKey='users'
                  // title='Users'
                  title={t("settings.userss")}
                >
                  {roleType !== "guest" && (
                    <div
                      className='text-end'
                      style={{ marginTop: "20px" }}
                    >
                      <Link
                        href='/createuser'
                        className='crte-userd CreateUserCustom'
                      >
                        {/* Create User */}
                        {t("settings.users.list.create_user")}
                      </Link>
                    </div>
                  )}

                  <div className='table-responsive order-table user-tbls'>
                    <table>
                      <thead>
                        <tr>
                          {/* <th>Profile</th> */}
                          <th>{t("settings.users.list.profile")}</th>
                          {/* <th>Name</th> */}
                          <th>{t("settings.users.list.name")}</th>
                          {/* <th>Status</th> */}
                          <th>{t("settings.users.list.status")}</th>
                          {/* <th>Type</th> */}
                          <th>{t("settings.users.list.type")}</th>
                          {/* <th>Email</th> */}
                          <th>{t("settings.users.list.email")}</th>
                          {roleType !== "guest" && <th></th>}
                        </tr>
                      </thead>
                      <tbody>
                        {fetchSeller?.data?.map((row, index) => {
                          const image = row?.profile_image
                            ? row?.profile_image
                            : "/images/user.png";
                          return (
                            <tr key={row?.id}>
                              <td>
                                <img
                                  src={row?.profile_image}
                                  onError={(e) =>
                                    (e.target.src = "/images/user.png")
                                  }
                                  style={{ height: "40px", width: "40px" }}
                                  className='rounded-circle'
                                />
                              </td>
                              <td>{row?.name}</td>
                              <td>
                                <Badge bg='success'>
                                  {row?.status ? "Active" : "Inactive"}
                                  {console.log("row?.status", row?.status)}
                                </Badge>
                              </td>
                              <td>{row?.role_type}</td>
                              <td>{row?.email}</td>
                              {roleType !== "guest" && (
                                <td className='actionbtn-right'>
                                  <Link href={`/useredit/${row?.id}`}>
                                    <img
                                      src='/images/edit-icn.svg'
                                      alt='Edit'
                                    />
                                  </Link>
                                </td>
                              )}
                            </tr>
                          );
                        })}
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
