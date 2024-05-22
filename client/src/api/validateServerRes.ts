export async function validateServerRes(res: Response): Promise<Response> {
    console.log(res)
    if (!res.ok) throw new Error(await res.text())
    return res
}
