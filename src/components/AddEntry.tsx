import { Action, ActionPanel, Form } from "@raycast/api";

const JIRA_URL = "https://pcol.atlassian.net/rest/api/2/issue/{tickedId}?fields=summary,status";
const JIRA_USER = "ppabich@valuelogic.one";
const JIRA_TOKEN =
  "ATATT3xFfGF02cHsgJG1cEdSuYEXMB0D20Eso-WoeiSgybSbgX99c5jlw9VJzlbmAkXZ_2sUNg1-idlrKKTzdHztym04zTLgUUCn0QqU7akZWwhSZsYIISE2Yw8-1I10WMgN1xARnISYXmE6ufB51fbxxJ3QgmHpi-pEQLyzXeAS20kO8eTbINo=1547957F";

export const AddEntry = () => {
  // const getTicketInfo = async () => {
  //   const information = await fetch();
  // };

  return (
    <Form
      navigationTitle="Zaraportuj zadanie"
      actions={
        <ActionPanel>
          {/* <Action title="Pobierz informacje o Jira Tikecie" onAction={() => console.log("test")} /> */}
          <Action.SubmitForm title="Dodaj wpis" onSubmit={(values) => console.log(values)} />
        </ActionPanel>
      }
    >
      <Form.DatePicker id="created_at" type={Form.DatePicker.Type.Date} defaultValue={new Date()} />
      <Form.TextField id="key" title="Jira ID" placeholder="Jira Ticket ID" />
      <Form.TextField id="description" title="Opis zadania" placeholder="Podaj któtki opis zadania" />
      <Form.Separator />
      <Form.TextField id="czas" title="Czas do zaportowania"></Form.TextField>
    </Form>
  );
};
