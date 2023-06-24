export const checkIfUndefined = (value: any) => {
    let returningValue = !!value ? value : ''
    console.log(returningValue)
    return returningValue
}