import {rest} from 'msw';

export const configHandlers = [
  rest.get('/front_new/msp/get_session_data.do', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({result: '1', data: 'b48f3b99-69be-4d75-851d-293cfcecf54f'}));
  }),

  rest.post('/front_new/msp/init_step_sequence_obr.do', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({result: 1, item: {operation_id: 'f55c7d6c-4dee-4b6f-82a5-a2a8b38859bc'}}));
  }),

  rest.get('front_new/msp/get_current_step.do?operation_id=f55c7d6c-4dee-4b6f-82a5-a2a8b38859bc', (req, res, ctx) => {
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
  }),
];

let updateCount = 0;

const responseStep1 = {
  result: 1,
  item: {
    payment_recipient_id: '7154',
    step: 2,
    partner_ain: 80002012,
    total_sum: 0.0,
    ain: 32162369,
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
                payload: '<root><business><accountGroup></accountGroup></business><parameters></parameters></root>',
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
};

const responseStep2 = {
  result: 1,
  item: {
    payment_recipient_id: '7154',
    step: 3,
    partner_ain: 80002012,
    total_sum: 0.0,
    ain: 32162369,
    processing_mode: 'FREE_PAYMENT',
    template: {
      description: 'НУО Фонд капитального ремонта в УР',
      next_template: [{source: 'PAYMENT', template_id: 999}],
      div: [
        {
          order: 10,
          visible: true,
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
                payload: '<root><business><accountGroup></accountGroup></business><parameters></parameters></root>',
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
                visible: false,
                editable: false,
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
              {
                order: 31,
                name: 'Service_00279835_2',
                type: 'SUM',
                description: 'Ведение спец.счета:',
                extType: 'PR_SERVICE',
                visible: true,
                editable: true,
                mandatory: false,
                value: '376.86',
                payload:
                  '<root><business><srvCode>00279835_2</srvCode><tariff></tariff><requiredPay></requiredPay><sum>376.86</sum></business><parameters><parameter xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns3="http://www.rtc-service.ru/partners/services/"><parName>SERVICE_NAME</parName><parValue>Ведение спец.счета</parValue><parType/></parameter><parameter xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns3="http://www.rtc-service.ru/partners/services/"><parName>BIK</parName><parValue>044525411</parValue><parType/></parameter><parameter xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns3="http://www.rtc-service.ru/partners/services/"><parName>NAME</parName><parValue>Удмуртское отделение № 8618</parValue><parType/></parameter><parameter xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns3="http://www.rtc-service.ru/partners/services/"><parName>SCHET</parName><parValue>40603810504240000034</parValue><parType/></parameter><parameter xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns3="http://www.rtc-service.ru/partners/services/"><parName>KS</parName><parValue>30101810145250000411</parValue><parType/></parameter></parameters></root>',
                validation: {expression: '^\\d{1,7}(\\.\\d{1,2})?$', message: 'Неверый формат ввода данных.'},
                example: 'Пример: 1234567.00',
                css_class: 'normalText',
              },
              {
                order: 32,
                name: 'Service_00279835_1',
                type: 'SUM',
                description: 'Взнос за кап. ремонт:',
                extType: 'PR_SERVICE',
                visible: true,
                editable: true,
                mandatory: false,
                value: '2171.18',
                payload:
                  '<root><business><srvCode>00279835_1</srvCode><tariff></tariff><requiredPay></requiredPay><sum>2171.18</sum></business><parameters><parameter xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns3="http://www.rtc-service.ru/partners/services/"><parName>SERVICE_NAME</parName><parValue>Взнос за кап. ремонт</parValue><parType/></parameter><parameter xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns3="http://www.rtc-service.ru/partners/services/"><parName>BIK</parName><parValue>049401601</parValue><parType/></parameter><parameter xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns3="http://www.rtc-service.ru/partners/services/"><parName>NAME</parName><parValue>Удмуртское отделение № 8618</parValue><parType/></parameter><parameter xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns3="http://www.rtc-service.ru/partners/services/"><parName>SCHET</parName><parValue>40604810268000000639</parValue><parType/></parameter><parameter xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns3="http://www.rtc-service.ru/partners/services/"><parName>KS</parName><parValue>30101810400000000601</parValue><parType/></parameter></parameters></root>',
                validation: {expression: '^\\d{1,7}(\\.\\d{1,2})?$', message: 'Неверый формат ввода данных.'},
                example: 'Пример: 1234567.00',
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
          {
            name: 'PERSONAL_ACCOUNT_PARAMETERS_FOR_FREE_PAYMENT',
            value:
              '<parameters><parameter xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns3="http://www.rtc-service.ru/partners/services/"><parName>ADDRESS</parName><parValue>427880, УР, р-н. Алнашский, с. Алнаши, ул. Красильникова, д. 5, кв.5</parValue><parType>_PARAM_SO</parType></parameter></parameters>',
          },
        ],
      },
    },
  },
};


export const accountHandlers = [
  rest.post('/front_new/msp/store_step.do', (req, res, ctx) => {
    updateCount++;

    return res(
      ctx.status(200),
      ctx.json(updateCount === 1 ? responseStep1 : responseStep2),
    );
  }),
];
