"use client";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GET, POST } from "../../Utils/apiFunctions";
import { BASE_URL } from "../../Utils/apiHelper";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import DeleteConfirm from "@/app/modals/deleteConfirm";

const Page = ({ param }) => {
  const { t } = useTranslation();
  const [radioValue, setRadioValue] = useState("1");
  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [fetchSellerById, setFetchSellerById] = useState(null);
  const [pending, setPending] = useState(false);
  const [roles, setRoles] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const params = useParams();

  const radios = [
    { name: t("settings.users.create.light"), value: "1" },
    { name: t("settings.users.create.dark"), value: "2" },
  ];

  const fetchSellerList = async () => {
    try {
      const response = await GET(
        `${BASE_URL}/api/admin/sellerList?id=${params?.id}`
      );
      if (response?.data?.data?.[0]) {
        const seller = response.data.data[0];
        setFetchSellerById(seller);
        setProfileImage(seller?.profile_image || "");
      }
    } catch (error) {
      toast.error("Failed to fetch seller details.");
    }
  };

  const fetchRoles = async () => {
    try {
      setPending(true);
      const response = await GET(`${BASE_URL}/api/admin/role`);
      if (response?.data?.status === true) {
        setRoles(response?.data?.data || []);
      } else {
        toast.error("Error fetching roles.");
      }
    } catch (error) {
      toast.error("Error fetching roles.");
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchSellerList();
      fetchRoles();
    }
  }, [params]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB size limit

    if (file) {
      if (file.size > maxSize) {
        toast.error(
          "The file is too large. Please select a file smaller than 2MB."
        );
        e.target.value = "";
        return; // Stop further processing
      }

      setSelectedImage(file); // Set selected file
      setProfileImage(URL.createObjectURL(file)); // Update the preview image
      setFieldValue("profile_image", file); // Only set form value if file is valid
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(t("settings.users.create.name_required")),
    email: Yup.string()
      .email(t("settings.users.create.invalid_email"))
      .required(t("settings.users.create.email_required")),
    userType: Yup.string().required(
      t("settings.users.create.user_type_required")
    ),
    status: Yup.string().required(t("settings.users.create.status_required")),
    language: Yup.string().required(
      t("settings.users.create.language_required")
    ),
  });

  const initialValues = {
    name: fetchSellerById?.name || "",
    email: fetchSellerById?.email || "",
    userType: fetchSellerById?.role_id || "",
    status: fetchSellerById?.status === 1 ? "Active" : "Inactive",
    language: fetchSellerById?.language_id,
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("role_id", values.userType);
      formData.append("status", values.status === "Active" ? 1 : 0);
      formData.append("language_id", values.language);
      formData.append("appearance", radioValue);

      if (selectedImage) {
        formData.append("profile_image", selectedImage);
      }

      const response = await POST(
        `${BASE_URL}/api/admin/sellerUpdate?id=${params?.id}`,
        formData
      );

      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        fetchSellerList();
        window.location.href = `/settings?type=seller`;
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating.");
    }
  };

  return (
    <>
      <Sidebar />
      <div className='detail-admin-main stng-pge'>
        <div className='admin-header'>
          {/* <h2>Settings</h2> */}
          <h2>{t("settings.settings")}</h2>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='shdw-crd crte-ordr edte-usr'>
              <div className='row'>
                <div className='col-md-7 mx-auto'>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={onSubmit}
                  >
                    {({ setFieldValue }) => (
                      <Form>
                        <div className='d-block text-center mb-4'>
                          <img
                            className='d-inline-block rounded-circle'
                            style={{ width: "100px", height: "100px" }}
                            src={profileImage}
                            onError={(e) => (e.target.src = "/images/user.png")}
                            // src='/images/user.png'
                          />
                          <div className='UploadPhoto_file'>
                            <input
                              className='UploadPhoto'
                              type='file'
                              accept='image/*'
                              onChange={handleImageChange}
                            />
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='mb-3'>
                              {/* <label>Name</label> */}
                              <label>{t("settings.users.create.name")}</label>
                              <Field
                                name='name'
                                className='form-control'
                              />
                              <ErrorMessage
                                name='name'
                                component='p'
                                className='text-danger'
                              />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='mb-3'>
                              {/* <label>Email</label> */}
                              <label>{t("settings.users.create.email")}</label>
                              <Field
                                name='email'
                                className='form-control'
                              />
                              <ErrorMessage
                                name='email'
                                component='p'
                                className='text-danger'
                              />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='mb-3'>
                              {/* <label>User Type</label> */}
                              <label>
                                {t("settings.users.create.user_type")}
                              </label>
                              <Field
                                as='select'
                                name='userType'
                                className='form-control'
                              >
                                <option value=''>Select User Type</option>
                                {roles?.map((role) => (
                                  <option
                                    key={role.id}
                                    value={role.id}
                                  >
                                    {role.name}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name='userType'
                                component='p'
                                className='text-danger'
                              />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='mb-3'>
                              <label>Status</label>
                              <Field
                                as='select'
                                name='status'
                                className='form-control'
                              >
                                <option value='Active'>Active</option>
                                <option value='Inactive'>Inactive</option>
                              </Field>
                              <ErrorMessage
                                name='status'
                                component='p'
                                className='text-danger'
                              />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='mb-3'>
                              {/* <label>Language</label> */}
                              <label>
                                {t("settings.users.create.language")}
                              </label>
                              <Field
                                as='select'
                                name='language'
                                className='form-control'
                              >
                                <option value={1}>Norwegian</option>
                                <option value={2}>English</option>
                              </Field>
                              <ErrorMessage
                                name='language'
                                component='p'
                                className='text-danger'
                              />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            {/* <div className='mb-3'>
                              <div className='swtch-bt'>
       
                                <label>
                                  {t("settings.users.create.appearance")}
                                </label>
                                <ButtonGroup>
                                  {radios.map((radio, idx) => (
                                    <ToggleButton
                                      key={idx}
                                      id={`radio-${idx}`}
                                      type='radio'
                                      variant={
                                        idx % 2
                                          ? "outline-success"
                                          : "outline-danger"
                                      }
                                      name='radio'
                                      value={radio.value}
                                      checked={radioValue === radio.value}
                                      onChange={(e) =>
                                        setRadioValue(e.currentTarget.value)
                                      }
                                    >
                                      {radio.name}
                                    </ToggleButton>
                                  ))}
                                </ButtonGroup>
                              </div>
                            </div> */}
                          </div>
                        </div>
                        <div className='row mt-3 mb-5'>
                          <div className='col-md-4'>
                            <button
                              className='createorder_top_right w-100 btn_bg_delt'
                              type='button'
                              onClick={() => {
                                window.location.href = `/settings?type=seller`;
                              }}
                            >
                              {/* cancel user */}
                              {t("settings.users.create.cancel")}
                            </button>
                          </div>
                          <div className='col-md-4'>
                            <button
                              className='createorder_top_right w-100 btn_bg_delt'
                              type='button'
                              onClick={() => {
                                setDeleteConfirm(true);
                              }}
                            >
                              {/* Delete user */}
                              {t("settings.users.create.delete_user")}
                            </button>
                          </div>

                          <div className='col-md-4'>
                            <button
                              className='createorder_top_right btn_bg_save w-100'
                              type='submit'
                            >
                              {/* Update */}
                              {t("settings.users.create.update")}
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirm
        isOpen={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        id={params?.id}
      />
    </>
  );
};

export default Page;
