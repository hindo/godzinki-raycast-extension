import { Action, ActionPanel, Detail, Form, Icon, useNavigation } from "@raycast/api";
import { useSQL } from "@raycast/utils";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { GODZINY_DB } from "../const";
import { fetchJiraSummary } from "../lib/jira";
import { TASK_LIST } from "../lib/queries";
import { TaskEntry } from "../types";

export const AddEntryForm = () => {
  const { data, isLoading, permissionView } = useSQL<TaskEntry>(GODZINY_DB, TASK_LIST);

  const [showForm, setShowForm] = useState<boolean>(false);

  const [jiraTicketId, setJiraTicketId] = useState<string>("");
  const [jiraTicketIdError, setJiraTicketIdError] = useState<string | undefined>();

  const [summary, setSummary] = useState<string>("");
  const [summaryError, setSummaryError] = useState<string | undefined>();

  const [time, setTime] = useState<string>("");
  const [timeError, setTimeError] = useState<string | undefined>();

  const [createdAt, setCreatedAt] = useState<string>("");
  const [createdAtError, setCreatedAtError] = useState<string | undefined>();

  const handleDropdownChange = (value: string) => {
    setShowForm(value === "newTask");
  };

  const handleFetchJiraSummary = async () => {
    if (jiraTicketId) {
      try {
        const data = await fetchJiraSummary(jiraTicketId);
        setJiraTicketId(data.key);
        setSummary(data.fields.summary);
      } catch (e) {
        setJiraTicketIdError((e as AxiosError).message);
      }
    }
  };

  useEffect(() => {
    setJiraTicketIdError(undefined);
  }, [jiraTicketId]);

  if (permissionView) {
    return permissionView;
  }

  const AddEntryAction = ({
    task,
    key,
    czas,
    summary,
    createdAt,
  }: {
    task: string;
    key: string;
    czas: string;
    summary: string;
    createdAt: string;
  }) => {
    console.log(task, key, czas, summary, createdAt);

    const { pop } = useNavigation();
    const query = `INSERT INTO hours (czas, task_id) VALUES (${czas}, ${task});`;
    console.log(query);
    const { data, isLoading, permissionView } = useSQL(GODZINY_DB, query, { permissionPriming: "Test" });

    useEffect(() => {
      pop();
    }, []);

    if (permissionView) {
      return permissionView;
    }

    return <Detail isLoading={isLoading} markdown="Dodawanie"></Detail>;
  };

  return (
    <Form
      isLoading={isLoading}
      navigationTitle="Zaraportuj zadanie"
      actions={
        <ActionPanel>
          <Action.Push
            title="Dodaj"
            target={<AddEntryAction task="1" key={jiraTicketId} summary={summary} createdAt={createdAt} czas={time} />}
          />
          <Action title="Pobierz informacje o Jira Tikecie" onAction={handleFetchJiraSummary} />
        </ActionPanel>
      }
    >
      <Form.DatePicker id="created_at" type={Form.DatePicker.Type.Date} defaultValue={new Date()} />
      <Form.Dropdown id="task" title="Zadanie" onChange={handleDropdownChange}>
        <Form.Dropdown.Item value="newTask" title="Dodaj nowe zadanie" icon={Icon.PlusCircle} />
        <Form.Dropdown.Section title="Istniejące zadania">
          {(data || []).map((taskEntry) => (
            <Form.Dropdown.Item
              key={taskEntry.id}
              value={taskEntry.id.toString()}
              title={taskEntry.key ? `${taskEntry.key} - ${taskEntry.summary}` : taskEntry.summary}
              icon={Icon.Cd}
            />
          ))}
        </Form.Dropdown.Section>
      </Form.Dropdown>
      {showForm ? (
        <>
          <Form.TextField
            id="key"
            title="Jira ID"
            placeholder="Jira Ticket ID"
            info="Pole to moze pozostać puste gdy nie posiadasz Jira Ticket ID"
            value={jiraTicketId}
            onChange={(value) => setJiraTicketId(value)}
            error={jiraTicketIdError}
          />
          <Form.TextField
            id="summary"
            title="Opis zadania"
            placeholder="Podaj któtki opis zadania"
            value={summary}
            onChange={(value) => setSummary(value)}
            error={summaryError}
          />
        </>
      ) : null}
      <Form.Separator />
      <Form.TextField id="czas" title="Czas do zaportowania" value={time} onChange={(v) => setTime(v)} />
    </Form>
  );
};
