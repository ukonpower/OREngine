import type { TexProceduralContract } from '../../core/Contracts/TexProceduralContract';

// .tex の実体。GPU資源を持たないので生成パラメータは捨てる
export class TexProcedural implements TexProceduralContract {

	public render() {}

	public dispose() {}

}
