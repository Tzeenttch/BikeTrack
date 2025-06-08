package com.tzeenttch.backend.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paypal.core.PayPalHttpClient;

import com.paypal.http.HttpResponse;
import com.paypal.orders.AmountWithBreakdown;
import com.paypal.orders.ApplicationContext;
import com.paypal.orders.Order;
import com.paypal.orders.OrderRequest;
import com.paypal.orders.OrdersCaptureRequest;
import com.paypal.orders.OrdersCreateRequest;
import com.paypal.orders.PurchaseUnitRequest;
import com.tzeenttch.backend.dto.PayPalDTO;

@Service
public class PayPalService {

    @Autowired
    private PayPalHttpClient payPalHttpClient;

    // Metodo para la orden de pago
    public PayPalDTO createOrder(String total, String currency) throws IOException {

        // Orden de pago vacia
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.checkoutPaymentIntent("CAPTURE");

        // Se deben de configurar los siguientes campos de forma personalizada para la
        // empresa (brandName, cancelUrl, returnUrl)
        ApplicationContext applicationContext = new ApplicationContext()
                .brandName(("BikeTrack")) // Nombre de la empresa
                .landingPage("BILLING") //
                .cancelUrl("http://localhost:4200/cancel-payment") // Pagina donde redirige si falla
                .returnUrl("http://localhost:4200/succes-payment") // Pagina donde redirige si se confirma el pago
                .userAction("PAY_NOW"); // Boton pagar ahora de paypal

        orderRequest.applicationContext(applicationContext);

        // Moneda y cantidad a pagar
        List<PurchaseUnitRequest> purchaseUnits = new ArrayList<>();
        purchaseUnits.add(new PurchaseUnitRequest()
                .amountWithBreakdown(new AmountWithBreakdown().currencyCode(currency).value(total)));

        orderRequest.purchaseUnits(purchaseUnits);

        // Orden que enviamos a PayPal
        OrdersCreateRequest request = new OrdersCreateRequest().requestBody(orderRequest);
        HttpResponse<Order> response = payPalHttpClient.execute(request);

        // Por ultimo devolvemos la ID de la orden
        return new PayPalDTO(response.result().id());

    }

    // Metodo que captura el pago cuando el usuario lo confirma en PayPal
    public PayPalDTO captureOrder(String orderId) throws IOException {

        OrdersCaptureRequest request = new OrdersCaptureRequest(orderId);

        request.requestBody(new OrderRequest());

        HttpResponse<Order> response = payPalHttpClient.execute(request);

        // Devolvemos el ID con el status de la orden
        return new PayPalDTO(response.result().id(), response.result().status());
    }

}
