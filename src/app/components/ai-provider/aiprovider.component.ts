import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService, DropDownOption } from 'src/app/service/crud.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-aiprovider',
  templateUrl: './aiprovider.component.html',
  styleUrls: ['./aiprovider.component.scss']
})
export class AIProviderComponent implements OnInit {
  aiProviderOptions:DropDownOption[] = [];
  aiProviderModelOptions:DropDownOption[] = [];
  selectedProvider!: DropDownOption;
  selectedModel!: DropDownOption;
  

  @ViewChild('aiProviderSelect') aiProviderSelect!: ElementRef;
  @ViewChild('aiModelSelect') aiModelSelect!: ElementRef;

  constructor(public crudService: CrudService) { 
  }

  ngOnInit() {
    this.crudService.getAIProviders().subscribe(res => {
      
      const aiProviders:DropDownOption[] = [];
      const selectedProviderValue:String = this.crudService.getProvider();
      for(let provider in res) {
        const option:DropDownOption = {name: res[provider].NAME, value: res[provider].VALUE};
        aiProviders.push(option);
        if(selectedProviderValue == res[provider].VALUE){
          this.selectedProvider = option;
          this.aiProviderSelect.nativeElement.selectedIndex = provider +1;
        }
      }
      this.aiProviderOptions = aiProviders;
      if(!selectedProviderValue){
        this.selectedProvider = this.aiProviderOptions[0];
        this.aiProviderSelect.nativeElement.selectedIndex = 1;
      }
      this.getAIProviderModel();
    });
  }

  form = new FormGroup({
    aiProvider: new FormControl('', Validators.required),
    aiProviderModel: new FormControl('', Validators.required)
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.form.value);
  }

  getAIProviderModel(){    
    this.crudService.getAIProviderModels(this.selectedProvider).subscribe(resp => {        
      const aiProviderModels:DropDownOption[] = [];
      const selectedModelValue:String = this.crudService.getModel();
      for(let availableModel in resp) {
      //return LLM_CONFIG[availableProvider].MODELS;
        const option:DropDownOption = {name: resp[availableModel].NAME, value: resp[availableModel].VALUE};
        aiProviderModels.push(option);
        if(selectedModelValue == resp[availableModel].VALUE){
          this.selectedModel = option;
          this.aiModelSelect.nativeElement.selectedIndex = availableModel +1;
        }
      }
      if(!selectedModelValue){
        this.selectedModel = this.aiProviderModelOptions[0];
        this.aiModelSelect.nativeElement.selectedIndex = 1;
      }
      this.aiProviderModelOptions = aiProviderModels;
      this.crudService.setProviderAndModel(this.selectedProvider?.value, this.selectedModel?.value);
      console.log(this.aiProviderOptions);
    });
  }

  changeAIProvider(event:any){
    console.log(event.target.value);
    this.selectedProvider = this.aiProviderOptions[event.target.selectedIndex-1];
    this.crudService.setProviderAndModel(this.selectedProvider?.value, this.selectedModel?.value);
    this.getAIProviderModel();
  }

  changeAIProviderModel(event:any){
    console.log(event.target.value);
    this.selectedModel = this.aiProviderModelOptions[event.target.selectedIndex-1];
    this.crudService.setProviderAndModel(this.selectedProvider.value, this.selectedModel.value);
  }

}
