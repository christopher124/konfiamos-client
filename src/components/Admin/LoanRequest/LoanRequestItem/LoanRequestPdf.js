import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { addDays, format } from "date-fns";

// Estilos personalizados
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10, // Tamaño de letra más pequeño
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  customerInfo: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
  },
  customerColumn: {
    marginRight: 20,
  },
  loanColumn: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333333",
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
    color: "#333333",
  },
  value: {
    marginBottom: 5,
    color: "#666666",
  },
  paymentDetails: {
    marginBottom: 20,
  },
  paymentTable: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  signature: {
    marginTop: 40,
    textAlign: "right",
  },
});

export function LoanRequestPdf(props) {
  const { loanRequest } = props;
  const payments = loanRequest.payments || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            src="https://picsum.photos/200"
            alt="Logo"
          />
          <Text>Konfiamos</Text>
        </View>

        {/* Información del cliente y préstamo */}
        <View style={styles.customerInfo}>
          <View style={styles.customerColumn}>
            <Text style={styles.sectionTitle}>Información del cliente:</Text>
            <Text>
              <Text style={styles.label}>Nombre:</Text>{" "}
              <Text style={styles.value}>
                {loanRequest?.customer?.firstname}{" "}
                {loanRequest?.customer?.lastname}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Género:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.customer?.gender}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Correo:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.customer?.email}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Teléfono:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.customer?.phone}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Número de celular:</Text>{" "}
              <Text style={styles.value}>
                {loanRequest?.customer?.cellnumber}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Calle:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.customer?.street}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Número interior:</Text>{" "}
              <Text style={styles.value}>
                {loanRequest?.customer?.number_int_address}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Número exterior:</Text>{" "}
              <Text style={styles.value}>
                {loanRequest?.customer?.number_ext_address}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Colonia:</Text>{" "}
              <Text style={styles.value}>
                {loanRequest?.customer?.neighborhood}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Código Postal:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.customer?.zip}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Estado:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.customer?.state}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Municipio:</Text>{" "}
              <Text style={styles.value}>
                {loanRequest?.customer?.municipality}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Ciudad:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.customer?.city}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Ocupación:</Text>{" "}
              <Text style={styles.value}>
                {loanRequest?.customer?.ocupation}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Clave interbancaria:</Text>{" "}
              <Text style={styles.value}>
                {loanRequest?.customer?.clave_int}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Banco:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.customer?.banco}</Text>
            </Text>
          </View>

          {/* Información del préstamo */}
          <View style={styles.loanColumn}>
            <Text style={styles.sectionTitle}>Información del préstamo:</Text>
            <Text>
              <Text style={styles.label}>Código:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.code}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Monto solicitado:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.amountRequested}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Estado:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.status}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Periodo:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.period}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Fecha de inicio:</Text>{" "}
              <Text style={styles.value}>
                {format(
                  addDays(new Date(loanRequest.startDate), 1),
                  "dd/MM/yyyy "
                )}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Fecha de finalización:</Text>{" "}
              <Text style={styles.value}>
                {format(
                  addDays(new Date(loanRequest.endDate), 1),
                  "dd/MM/yyyy "
                )}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Monto de interés:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.interestAmount}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Monto total:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.totalAmount}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Periodos pagados:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.periodPaid}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Total pagado:</Text>{" "}
              <Text style={styles.value}>{loanRequest?.totalPaid}</Text>
            </Text>
          </View>
        </View>

        {/* Detalles de pagos */}
        <View style={styles.paymentDetails}>
          <Text style={styles.sectionTitle}>Detalles de pagos:</Text>
          <View style={styles.paymentTable}>
            {/* Encabezado de tabla */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.label}>Monto</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.label}>Fecha de pago</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.label}>Pagado</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.label}>Estado</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.label}>Fecha de vencimiento</Text>
              </View>
            </View>

            {/* Filas de tabla */}
            {payments.map((payment, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>{payment?.paymentAmount}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>
                    {format(
                      addDays(new Date(payment.paymentDate), 1),
                      "dd/MM/yyyy "
                    )}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{payment?.paid ? "Sí" : "No"}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{payment?.status}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>
                    {format(
                      addDays(new Date(payment.dueDate), 1),
                      "dd/MM/yyyy "
                    )}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Firma del cliente */}
        <View style={styles.signature}>
          <Text>Firma del cliente: ________________________</Text>
        </View>
      </Page>
    </Document>
  );
}
