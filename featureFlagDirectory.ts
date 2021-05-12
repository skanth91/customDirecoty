import { HttpClient } from "@angular/common/http";
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AppConfig } from "./app.config.service";

@Directive({
    selector: '[featureFlagConfig]'
  })
  export class FeatureFlagDirective {
    @Input() featureFlagConfig: string | string[];
    private httpClient: HttpClient;
    constructor(
      private vcr: ViewContainerRef,
      private tpl: TemplateRef<any>,
      private appConfig: AppConfig,
      httpClient: HttpClient
    ) {
        this.httpClient =httpClient;
    }

    public async ngOnInit() : Promise<void> {
        try{
          var remoteConfig = await this.httpClient
          .get<AppConfig>("assets/config.json").toPromise();
    
          console.log(remoteConfig.featureFlag.enabled)
          console.log(this.featureFlagConfig)
          if (remoteConfig.featureFlag.enabled == this.featureFlagConfig) {
            this.vcr.createEmbeddedView(this.tpl);
          }
          
        } catch(err) {
          console.log(err)
        }
      }
  
  }
