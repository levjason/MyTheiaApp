/**
 * Generated using theia-extension-generator
 */
import { ContainerModule } from '@theia/core/shared/inversify';
import { ticExtensionContribution } from './ticExtension-contribution';


export default new ContainerModule(bind => {

    // Replace this line with the desired binding, e.g. "bind(CommandContribution).to(ticExtensionContribution)
    bind(ticExtensionContribution).toSelf();
});
