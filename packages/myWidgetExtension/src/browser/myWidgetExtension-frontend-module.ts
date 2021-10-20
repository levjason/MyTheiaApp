import { ContainerModule } from '@theia/core/shared/inversify';
import { MyWidgetExtensionWidget } from './myWidgetExtension-widget';
import { MyWidgetExtensionContribution } from './myWidgetExtension-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, MyWidgetExtensionContribution);
    bind(FrontendApplicationContribution).toService(MyWidgetExtensionContribution);
    bind(MyWidgetExtensionWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: MyWidgetExtensionWidget.ID,
        createWidget: () => ctx.container.get<MyWidgetExtensionWidget>(MyWidgetExtensionWidget)
    })).inSingletonScope();
});
