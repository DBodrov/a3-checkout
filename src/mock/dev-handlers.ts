import {rest} from 'msw';

export const configHandlers = [
  rest.get('/front_new/msp/get_session_data.do', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({result: '1', data: 'b48f3b99-69be-4d75-851d-293cfcecf54f'}));
  }),

  rest.post('/front_new/msp/init_step_sequence_obr.do', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({result: 1, item: {operation_id: 'f55c7d6c-4dee-4b6f-82a5-a2a8b38859bc'}}),
    );
  }),

  rest.get(
    'front_new/msp/get_current_step.do?operation_id=f55c7d6c-4dee-4b6f-82a5-a2a8b38859bc',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          result: 1,
          item: {
            payment_recipient_id: '7154',
            step: 1,
            partner_ain: 80002012,
            total_sum: 0.0,
            ain: 31446097,
            processing_mode: 'FREE_PAYMENT',
            processing_status: 'UNDEFINED',
            template: {
              description: 'НУО Фонд капитального ремонта в УР',
              next_template: [{source: 'ESB', template_id: 1}],
              div: [
                {
                  order: 10,
                  fields: {
                    field: [
                      {
                        order: 10,
                        name: 'PERSONAL_ACCOUNT',
                        type: 'INPUT',
                        description: 'Лицевой счет:',
                        extType: 'PERSONAL_ACCOUNT',
                        visible: true,
                        editable: true,
                        mandatory: true,
                        validation: {expression: '\\d{1,10}$', message: 'Неверный формат ввода данных.'},
                        example: 'Пример: 1234567890',
                        css_class: 'normalText',
                        hint: {text: 'Лицевой счет может содержать от 1 до 10 цифр.'},
                      },
                      {
                        order: 12,
                        name: 'CHECK_TEXT',
                        type: 'TEXTAREA',
                        description: 'Адрес:',
                        extType: 'CLIENT',
                        visible: false,
                        editable: false,
                        mandatory: false,
                        css_class: 'normalText',
                      },
                      {
                        default: 'freepayment',
                        order: 15,
                        name: 'SELECT_INVOICE',
                        type: 'RADIO',
                        description: 'Выберите вид оплаты:',
                        extType: 'INVOICE',
                        visible: false,
                        editable: true,
                        mandatory: true,
                        value: 'freepayment',
                        radio: {
                          item: [
                            {
                              name: 'invoicepayment',
                              description: 'Оплата по счету на сумму %invoiceAmount% руб.',
                            },
                            {name: 'freepayment', description: 'Произвольная сумма'},
                          ],
                        },
                        css_class: 'normalText',
                      },
                    ],
                  },
                },
              ],
            },
          },
        }),
      );
    },
  ),
];

export const accountHandlers = [
  rest.post('/front_new/msp/store_step.do', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: 1,
        item: {
          payment_recipient_id: '7154',
          step: 2,
          partner_ain: 80002012,
          total_sum: 0.0,
          ain: 31446097,
          processing_mode: 'FREE_PAYMENT',
          processing_status: 'VERIFIED',
          template: {
            description: 'НУО Фонд капитального ремонта в УР',
            next_template: [{source: 'ESB', template_id: 2}],
            div: [
              {
                order: 10,
                fields: {
                  field: [
                    {
                      order: 10,
                      name: 'PERSONAL_ACCOUNT',
                      type: 'INPUT',
                      description: 'Лицевой счет:',
                      extType: 'PERSONAL_ACCOUNT',
                      visible: true,
                      editable: false,
                      mandatory: true,
                      value: '00279835',
                      payload:
                        '<root><business><accountGroup></accountGroup></business><parameters></parameters></root>',
                      validation: {expression: '\\d{1,10}$', message: 'Неверный формат ввода данных.'},
                      css_class: 'normalText',
                    },
                    {
                      order: 12,
                      name: 'CHECK_TEXT',
                      type: 'TEXTAREA',
                      description: 'Адрес:',
                      extType: 'CLIENT',
                      visible: true,
                      editable: false,
                      mandatory: false,
                      value: '427880, УР, Р-Н. АЛНАШСКИЙ, С. АЛНАШИ, УЛ. КРАСИЛЬНИКОВА, Д. 5, КВ.5',
                      css_class: 'normalText',
                    },
                    {
                      default: '00279835_022022',
                      order: 15,
                      name: 'SELECT_INVOICE',
                      type: 'RADIO',
                      description: 'Выберите вид оплаты:',
                      extType: 'INVOICE',
                      visible: true,
                      editable: true,
                      mandatory: true,
                      value: 'freepayment',
                      radio: {
                        item: [
                          {name: '00279835_022022', description: 'Оплата по счету на сумму 2548.04 руб.'},
                          {name: 'freepayment', description: 'Произвольная сумма'},
                        ],
                      },
                      css_class: 'normalText',
                    },
                  ],
                },
              },
            ],
            parameters: {
              parameter: [
                {
                  name: 'personalAccountInfoResponse',
                  value:
                    '<ns3:personalAccountInfoResponse xmlns:ns3="http://www.rtc-service.ru/partners/services/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"><result><resCode>0</resCode><resMessage>ОК</resMessage></result><balanceValue>2548.04</balanceValue><balanceSign>+</balanceSign><checkText>427880, УР, Р-Н. АЛНАШСКИЙ, С. АЛНАШИ, УЛ. КРАСИЛЬНИКОВА, Д. 5, КВ.5</checkText><accountGroup/><services><service><srvName>Ведение спец.счета</srvName><srvCode>00279835_2</srvCode><sum>376.86</sum><parameters><parameter><parName>SERVICE_NAME</parName><parValue>Ведение спец.счета</parValue><parType/></parameter><parameter><parName>BIK</parName><parValue>044525411</parValue><parType/></parameter><parameter><parName>NAME</parName><parValue>Удмуртское отделение № 8618</parValue><parType/></parameter><parameter><parName>SCHET</parName><parValue>40603810504240000034</parValue><parType/></parameter><parameter><parName>KS</parName><parValue>30101810145250000411</parValue><parType/></parameter></parameters></service><service><srvName>Взнос за кап. ремонт</srvName><srvCode>00279835_1</srvCode><sum>2171.18</sum><parameters><parameter><parName>SERVICE_NAME</parName><parValue>Взнос за кап. ремонт</parValue><parType/></parameter><parameter><parName>BIK</parName><parValue>049401601</parValue><parType/></parameter><parameter><parName>NAME</parName><parValue>Удмуртское отделение № 8618</parValue><parType/></parameter><parameter><parName>SCHET</parName><parValue>40604810268000000639</parValue><parType/></parameter><parameter><parName>KS</parName><parValue>30101810400000000601</parValue><parType/></parameter></parameters></service></services><counters/><parameters><parameter><parName>ADDRESS</parName><parValue>427880, УР, р-н. Алнашский, с. Алнаши, ул. Красильникова, д. 5, кв.5</parValue><parType>_PARAM_SO</parType></parameter></parameters></ns3:personalAccountInfoResponse>',
                },
                {
                  name: 'getInvoicesResponce',
                  value:
                    '<ns3:getInvoicesResponse xmlns:ns3="http://www.rtc-service.ru/partners/services/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"><result><resCode>0</resCode><resMessage>ОК</resMessage></result><invoices><invoice><invoiceNumber>00279835_022022</invoiceNumber><invoiceDate>2022-02-02T09:35:49.691+03:00</invoiceDate><invoiceAmount>2548.04</invoiceAmount><invoiceType>0</invoiceType><invoiceStatus>0</invoiceStatus><activeDate>2022-03-02+03:00</activeDate><services><service><srvName>Ведение спец.счета</srvName><srvCode>00279835_2</srvCode><sum>376.86</sum><parameters><parameter><parName>SERVICE_NAME</parName><parValue>Ведение спец.счета</parValue><parType/></parameter><parameter><parName>BIK</parName><parValue>044525411</parValue><parType/></parameter><parameter><parName>NAME</parName><parValue>Удмуртское отделение № 8618</parValue><parType/></parameter><parameter><parName>SCHET</parName><parValue>40603810504240000034</parValue><parType/></parameter><parameter><parName>KS</parName><parValue>30101810145250000411</parValue><parType/></parameter></parameters></service><service><srvName>Взнос за кап. ремонт</srvName><srvCode>00279835_1</srvCode><sum>2171.18</sum><parameters><parameter><parName>SERVICE_NAME</parName><parValue>Взнос за кап. ремонт</parValue><parType/></parameter><parameter><parName>BIK</parName><parValue>049401601</parValue><parType/></parameter><parameter><parName>NAME</parName><parValue>Удмуртское отделение № 8618</parValue><parType/></parameter><parameter><parName>SCHET</parName><parValue>40604810268000000639</parValue><parType/></parameter><parameter><parName>KS</parName><parValue>30101810400000000601</parValue><parType/></parameter></parameters></service></services></invoice></invoices></ns3:getInvoicesResponse>',
                },
              ],
            },
          },
        },
      }),
    );
  }),
];

export const authHandlers = [
  // rest.post('/api/auth', (req, res, ctx) => {
  //   const {jwt} = req.body as TLoginRequest;
  //   if (jwt === '_expired') {
  //     return res(ctx.status(200), ctx.json({error: {message: 'JWT expired'}}));
  //   }
  //   if (jwt === '_error') {
  //     return res(ctx.status(504));
  //   }
  //   return res(ctx.status(200), ctx.json({data: {token: uuid4()}}));
  // }),
];
const mockPaReq = `<!DOCTYPE html>
<HTML>
<HEAD>
</HEAD>
<BODY ONLOAD="javascript:OnLoadEvent();">
<!--Start3ds-->
<FORM ACTION="https://test.3ds.payment.ru/way4acs/pa?id=YZzlloxdj1cxCtLHTnm74A.OC" METHOD="post" NAME="ThreeDform" target="_self">
<input name="PaReq" type="hidden" value="eJxVUl1zgjAQ/CsOr52aEETFOePgV7Wj1iodW186GDJKR4JAaLG/vgnFat9uNze7d3uBXhEda588zcJYdA2zjo0aFywOQrHvGi/e+L5t9Ch4h5Tz4ZqzPOUU5jzL/D2vhUHXWLornnTett/HY1wEHyYrBnI28UTUargGhfKZQmVAlX6dALpApZSygy8kBZ8l/emC2najZTuAKggRT6dDijG2HcdpOdhqtjEG9EuD8CNOvdHae5+PVoMJoJIAFudCpmfabFiALgDy9EgPUp46CEmeyTqLI0CaBHQdY5nrKlMiRRjQfnuXnDfTfr5I8kFRhNsNaWyar9bJHnUB6Q4IfMkpwcQ0TWLVTNKxnQ5WK5Y8+JF2p6aeuarhpC3cm4dbAlTCqTrAZfgLAl6cYsFVh9L+qyHgGSsDUIa6BHRdYDDRqTKpgnLXYpy4rfEubpLdMy7yp9njMOjfPXw9zHTWZZO2CFVQhGCr9NAAkJZB1RlRdXlV/fsRP5xCv2I=">
<input name="MD" type="hidden" value="373650-0CA4EFBE1A0DB0DE">
<input name="TermUrl" type="hidden" value="https://test.3ds.payment.ru/cgi-bin/cgi_link">
</FORM>
<SCRIPT>
function OnLoadEvent ()
{
  document.forms[0].submit();
}
</SCRIPT>
</BODY>
</HTML>`;

const fakePaReq = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3DS Hold</title>
</head>
<body>
  <form action="http://localhost:9999/.netlify/functions/threeD" method="post">
    <h3>Код - 1111</h3>
    <input type="text" >
    <button type="submit">Отправить код</button>
  </form>

</body>
</html>
`;

const mockData3DS = (transactionId: string) => ({
  transactionId,
  result: 'THREE_DS',
  paReq: fakePaReq,
  transactionStatus: 'HOLD_3DS_WAITING',
});

const mockDataNo3DS = (transactionId: string) => ({
  paReq: null,
  result: 'SUCCESS',
  transactionId,
  transactionStatus: 'DEBITED',
});

export const paymentHandlers = [
  rest.post('/v1/processing/pay', (req, res, ctx) => {
    console.log(req.body);
    const {transactionId} = req?.body;
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        data: mockDataNo3DS(transactionId),
      }),
    );
  }),
  rest.get('/v1/processing/pay', (req, res, ctx) => {
    console.log(req.body);
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        data: mockData3DS(req.body['transactionId']),
      }),
    );
  }),
];
