import React from "react";
import { Modal, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { POST } from "../Utils/apiFunctions";
import { BASE_URL } from "../Utils/apiHelper";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const CreateTask = (props) => {
  const formik = useFormik({
    initialValues: {
      taskName: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      createdBy: "",
      description: "",
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required("Task name is required"),
      startDate: Yup.string().required("Start date is required"),
      startTime: Yup.string().required("Start time is required"),
      endDate: Yup.string().required("End date is required"),
      endTime: Yup.string().required("End time is required"),
      createdBy: Yup.string().required("Creator name is required"),
      description: Yup.string().required("Task description is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          user_id: props.id,
          task_name: values.taskName,
          start_date: `${values.startDate}T${values.startTime}`,
          end_date: `${values.endDate}T${values.endTime}`,
          created_by: values.createdBy,
          description: values.description,
        };

        const response = await POST(
          `${BASE_URL}/api/admin/customerTaskCreate`,
          data
        );

        if (response?.data?.status) {
          toast.dismiss();
          toast.success(response.data?.message);
          props.onHide();
          formik.resetForm();
        }

        console.log("Task created successfully:", response.data);
      } catch (error) {
        console.error("Error creating task:", error);
      }
    },
  });
  const { t } = useTranslation();
  return (
    <Modal
      className='prodct-viewp createtask'
      {...props}
      size='lg'
    >
      <Modal.Header>
        {/* <Modal.Title>Create a task</Modal.Title> */}
        <Modal.Title>{t("create_task.create_a_task")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className='login-frm'
          onSubmit={formik.handleSubmit}
        >
          <Form.Group
            className='form-group'
            controlId='taskName'
          >
            <Form.Label>Task name</Form.Label>
            <Form.Control
              type='text'
              name='taskName'
              value={formik.values.taskName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.taskName && formik.touched.taskName}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.taskName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className='form-group'
            controlId='startDateTime'
          >
            <div className='inputtime'>
              {/* <Form.Label>Start time:</Form.Label> */}
              <Form.Label>{t("create_task.start_time")}</Form.Label>
              <div className='d-flex gap-4'>
                <Form.Control
                  type='date'
                  name='startDate'
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!formik.errors.startDate && formik.touched.startDate
                  }
                />
                <p>@</p>
                <Form.Control
                  type='time'
                  name='startTime'
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!formik.errors.startTime && formik.touched.startTime
                  }
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.startDate || formik.errors.startTime}
                </Form.Control.Feedback>
              </div>
            </div>
          </Form.Group>

          <Form.Group
            className='form-group'
            controlId='endDateTime'
          >
            <div className='inputtime'>
              {/* <Form.Label>End time:</Form.Label> */}
              <Form.Label>{t("create_task.end_time")}</Form.Label>
              <div className='d-flex gap-4 align-items-center'>
                <Form.Control
                  type='date'
                  name='endDate'
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={!!formik.errors.endDate && formik.touched.endDate}
                />
                <p>@</p>
                <Form.Control
                  type='time'
                  name='endTime'
                  value={formik.values.endTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={!!formik.errors.endTime && formik.touched.endTime}
                />
                <Form.Control.Feedback type='invalid'>
                  {formik.errors.endDate || formik.errors.endTime}
                </Form.Control.Feedback>
              </div>
            </div>
          </Form.Group>

          <Form.Group
            className='form-group'
            controlId='createdBy'
          >
            {/* <Form.Label>Created by</Form.Label> */}
            <Form.Label>{t("create_task.created_by")}</Form.Label>
            <Form.Control
              type='text'
              name='createdBy'
              value={formik.values.createdBy}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.createdBy && formik.touched.createdBy}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.createdBy}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className='form-group'
            controlId='description'
          >
            {/* <Form.Label>Task description</Form.Label> */}
            <Form.Label>{t("create_task.task_description")}</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              name='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                !!formik.errors.description && formik.touched.description
              }
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <button
            type='submit'
            className='bold-btn w-50 p-3'
          >
            {t("create_task.create_a_task")}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateTask;
