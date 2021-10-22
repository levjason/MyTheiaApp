import { ContainerModule } from '@theia/core/shared/inversify';
import { ticExtensionWidget } from './ticExtension-widget';
import { ticExtensionContribution } from './ticExtension-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, ticExtensionContribution);
    bind(FrontendApplicationContribution).toService(ticExtensionContribution);
    bind(ticExtensionWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: ticExtensionWidget.ID,
        createWidget: () => ctx.container.get<ticExtensionWidget>(ticExtensionWidget)
    })).inSingletonScope();
});
