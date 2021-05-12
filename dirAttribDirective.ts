import { HttpClient } from "@angular/common/http";
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[dirAttrConfig]'
  })
  export class DirAttribDirective {
    @Input() dirAttrConfig: string | string[];
    private httpClient: HttpClient;
    private featureFlag!: {
        enabled: any
      }
    constructor(
      private vcr: ViewContainerRef,
      private tpl: TemplateRef<any>,
      httpClient: HttpClient
    ) {
        this.httpClient =httpClient;
    }

    public async ngOnInit() : Promise<void> {
        try{
          var remoteConfig = await this.httpClient
          .get<DirAttribDirective>("assets/config.json").toPromise();
          if (remoteConfig.featureFlag.enabled == this.dirAttrConfig) {
            this.vcr.createEmbeddedView(this.tpl);
          }
          
        } catch(err) {
          console.log(err)
        }
      }
  
  }
