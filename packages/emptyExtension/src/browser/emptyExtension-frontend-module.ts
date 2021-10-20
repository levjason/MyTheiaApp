/**
 * Generated using theia-extension-generator
 */
import { ContainerModule } from '@theia/core/shared/inversify';
import { EmptyExtensionContribution } from './emptyExtension-contribution';


export default new ContainerModule(bind => {

    // Replace this line with the desired binding, e.g. "bind(CommandContribution).to(EmptyExtensionContribution)
    bind(EmptyExtensionContribution).toSelf();
});
