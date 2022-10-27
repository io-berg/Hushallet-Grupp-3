import { useFormik } from "formik";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import * as Yup from "yup";
import { Task } from "../utils/type";
import DualBottomButton from "./DualBottomButton";
import EffortPicker from "./EffortPicker";
import FrequencyPicker from "./FrequencyPicker";
import TextInputField from "./TextInputField";

interface Props {
  onSubmit: (Task: Task) => void;
  editTask?: Task;
  onCancel: () => void;
  onDelete: (Task: Task) => void;
}

const TaskForm = ({ onSubmit, editTask, onCancel, onDelete }: Props) => {
  const [visible, setVisible] = useState(false);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("En syssla kräver en titel").min(1).label("Title"),
    description: Yup.string()
      .required("En syssla kräver en beskrivning")
      .min(1)
      .label("Description"),
    effort: Yup.number().required().min(1).label("Effort"),
    frequency: Yup.number().required().min(1).label("Deadline"),
  });

  const values: Task = editTask
    ? editTask
    : {
        id: 0,
        title: "",
        description: "",
        effort: 1,
        frequency: 1,
        taskHistory: [],
      };

  const formik = useFormik<Task>({
    initialValues: values,
    onSubmit: (values) => {
      onSubmit(values);
    },
    validationSchema,
  });

  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
          <Paragraph>Är du säker på att du vill radera denna sysla?</Paragraph>
          <Dialog.Actions>
            <Button onPress={() => onDelete(values)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <TextInputField
        placeholder="Titel"
        onChange={formik.handleChange("title")}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <View
        style={{
          paddingVertical: 10,
        }}
      />
      <TextInputField
        placeholder="Beskrivning"
        onChange={formik.handleChange("description")}
        value={formik.values.description}
        type="multiline"
        error={formik.errors.description}
      />
      <View
        style={{
          paddingVertical: 10,
        }}
      />
      <FrequencyPicker
        value={formik.values.frequency}
        onChange={(value) => formik.setFieldValue("frequency", value)}
      />
      <View
        style={{
          paddingVertical: 10,
        }}
      />
      <EffortPicker
        value={formik.values.effort}
        onChange={(value) => formik.setFieldValue("effort", value)}
      />
      <View
        style={{
          paddingVertical: 10,
        }}
      >
        <Button onPress={() => setVisible(true)}> Radera Syssla </Button>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          flex: 1,
        }}
      >
        <DualBottomButton
          title1="Spara"
          icon1="plus-circle-outline"
          title2="Stäng"
          icon2="close-circle-outline"
          onPress1={() => formik.handleSubmit()}
          onPress2={() => onCancel()}
        />
      </View>
    </View>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    alignItems: "center",
    height: "100%",
  },
  dialog: {
    alignItems: "center",
    paddingTop: 15,
  },
});
