export async function validateServerRes(res: Response): Promise<Response> {
    if (!res.ok) throw new Error(await res.text())
    return res
}
