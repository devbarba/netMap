import React, { forwardRef } from "react";
import MaterialTable from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import ListIcon from "@material-ui/icons/List";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const CustomMaterialTable = props => {
  const { columns, data, title, insert, update, destroy, modal } = props;

  return (
    <MaterialTable
      icons={tableIcons}
      columns={columns}
      data={data}
      title={title}
      editable={{
        onRowAdd: insert ? async newData => await insert(newData) : null,
        onRowUpdate: update
          ? async (newData, oldData) => await update(newData, oldData)
          : null,
        onRowDelete: destroy ? async oldData => await destroy(oldData) : null
      }}
      actions={
        modal
          ? [
              {
                icon: ListIcon,
                tooltip: "Listar IPs",
                onClick: (event, rowData) => modal(rowData)
              }
            ]
          : []
      }
      localization={{
        header: { actions: "Ações" },
        body: {
          emptyDataSourceMessage: "Desculpe, nenhum registro foi econtrado.",
          addTooltip: "Adicionar",
          deleteTooltip: "Excluir",
          editTooltip: "Alterar",
          editRow: {
            deleteText: "Tem certeza que deseja excluir?",
            cancelTooltip: "Cancelar",
            saveTooltip: "Salvar",
            editTooltip: "Alterar"
          }
        },
        toolbar: {
          searchTooltip: "Procurar",
          searchPlaceholder: "Digite aqui para pesquisar"
        },
        pagination: {
          labelRowsSelect: "registros por página",
          labelDisplayedRows: " {from}-{to} de {count}",
          firstTooltip: "Primeira página",
          previousTooltip: "Página anterior",
          nextTooltip: "Próxima página",
          lastTooltip: "Última página"
        }
      }}
    />
  );
};

export default CustomMaterialTable;
