// const div = [
//   {
//     order: 10,
//     fields: {
//       field: [
//         {
//           order: 10,
//           name: 'PERSONAL_ACCOUNT',
//           type: 'INPUT',
//           description: 'Лицевой счет:',
//           extType: 'PERSONAL_ACCOUNT',
//           visible: true,
//           editable: false,
//           mandatory: true,
//           value: '00279835',
//           payload: '<root><business><accountGroup></accountGroup></business><parameters></parameters></root>',
//           validation: {
//             expression: '\\d{1,10}$',
//             message: 'Неверный формат ввода данных.',
//           },
//           css_class: 'normalText',
//         },
//         {
//           order: 12,
//           name: 'CHECK_TEXT',
//           type: 'TEXTAREA',
//           description: 'Адрес:',
//           extType: 'CLIENT',
//           visible: true,
//           editable: false,
//           mandatory: false,
//           value: '427880, УР, Р-Н. АЛНАШСКИЙ, С. АЛНАШИ, УЛ. КРАСИЛЬНИКОВА, Д. 5, КВ.5',
//           css_class: 'normalText',
//         },
//         {
//           default: '00279835_022022',
//           order: 15,
//           name: 'SELECT_INVOICE',
//           type: 'RADIO',
//           description: 'Выберите вид оплаты:',
//           extType: 'INVOICE',
//           visible: true,
//           editable: true,
//           mandatory: true,
//           value: 'freepayment',
//           radio: {
//             item: [
//               {
//                 name: '00279835_022022',
//                 description: 'Оплата по счету на сумму 2548.04 руб.',
//               },
//               {
//                 name: 'freepayment',
//                 description: 'Произвольная сумма',
//               },
//             ],
//           },
//           css_class: 'normalText',
//         },
//       ],
//     },
//   },
// ];

type TValidation = {
  expression: string;
  message: string;
};

type TFieldType = 'INPUT' | 'TEXTAREA' | 'RADIO' | 'SUM';

type TRadioProps = {
  item: {name: string; description: string}[];
};

export type TField = {
  default?: string;
  order: number;
  name: string;
  type: TFieldType;
  description: string;
  extType: string;
  visible: boolean;
  editable: boolean;
  mandatory: boolean;
  value?: string;
  payload?: string;
  validation?: TValidation;
  css_class?: string;
  radio?: TRadioProps;
  hint?: {
    text: string;
  };
  example?: string;
  alert?: {
    alert_type: 'ERROR' | string;
    business_error_code: string;
    text: string;
  }
};

export interface ITemplate {
  order: number;
  fields: {
    field: TField[];
  };
}
