import ReactInputMask from "react-input-mask";

export function InputMask({ id, mask, ...rest }: InputMask) {
    return (
        <ReactInputMask
            className="form-control"
            id={id}
            mask={mask}
            maskChar={null}
            required
           {...rest}
        />
    )
}