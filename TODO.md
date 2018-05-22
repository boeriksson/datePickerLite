1. Isolate date-time functionality from model

2. implement Lerna and have one sub component for:
    * js-joda - datePickerLiteJoda
    * date-fns - datePickerLiteFns
    * moment - datePickerLiteMoment

    Where each component has resp. dateTime framework as a peerDependency
